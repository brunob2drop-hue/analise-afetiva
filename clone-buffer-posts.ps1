# ==========================
# CONFIGURAÇÃO
# ==========================

# Defina o token aqui ou passe via variável de ambiente antes de rodar:
# $env:BUFFER_ACCESS_TOKEN = "<SEU_TOKEN_AQUI>"

if (-not $env:BUFFER_ACCESS_TOKEN -or $env:BUFFER_ACCESS_TOKEN -eq "") {
  Write-Host "BUFFER_ACCESS_TOKEN não definido. Use:" -ForegroundColor Red
  Write-Host '$env:BUFFER_ACCESS_TOKEN = "<SEU_TOKEN_AQUI>"' -ForegroundColor Yellow
  exit 1
}

$orgId              = "69d069610f822245c9a60c77"
$channelYoutubeId   = "69d64889031bfa423ce0591d"
$channelInstagramId = "69d07687af47dacb6988806e"
$channelTiktokId    = "69d94cce031bfa423cee4c34"

# Log opcional
$logFile = Join-Path $PSScriptRoot "sync-buffer-log-$(Get-Date -Format 'yyyyMMdd-HHmmss').csv"
$log = @()

# ==========================
# FUNÇÕES AUXILIARES
# ==========================

function Invoke-Buffer {
  param(
    [string]$Query
  )

  $body = @{ query = $Query } | ConvertTo-Json -Depth 8

  $response = Invoke-RestMethod `
    -Uri "https://api.buffer.com/graphql" `
    -Method POST `
    -Headers @{
      "Authorization" = "Bearer $env:BUFFER_ACCESS_TOKEN"
      "Content-Type"  = "application/json"
    } `
    -Body $body

  return $response
}

function New-BufferVideoPost {
  param(
    [string]$ChannelId,
    [string]$Text,
    [string]$VideoUrl
  )

  # Garante string não nula
  if (-not $Text)   { $Text = "" }
  if (-not $VideoUrl) { return $null }

  # Escapa texto e URL para usarmos dentro da mutation
  $escapedText     = ($Text     | ConvertTo-Json).Trim('"')
  $escapedVideoUrl = ($VideoUrl | ConvertTo-Json).Trim('"')

  $mutation = @"
mutation CreatePost {
  createPost(input: {
    text: "$escapedText",
    channelId: "$ChannelId",
    schedulingType: automatic,
    mode: addToQueue,
    assets: {
      videos: [
        { url: "$escapedVideoUrl" }
      ]
    }
  }) {
    ... on PostActionSuccess {
      post {
        id
        channelId
      }
    }
    ... on MutationError {
      message
    }
  }
}
"@

  try {
    $resp = Invoke-Buffer -Query $mutation
    return $resp.data.createPost
  }
  catch {
    return @{ error = $_.Exception.Message }
  }
}

# ==========================
# 1. LER POSTS PENDENTES DO YOUTUBE
# ==========================

Write-Host "Lendo posts pendentes do YouTube..." -ForegroundColor Cyan

$ytQuery = @"
query GetAllYoutubePosts {
  posts(
    first: 200,
    input: {
      organizationId: "$orgId",
      filter: {
        status: [pending],
        channelIds: ["$channelYoutubeId"]
      },
      sort: [
        { field: dueAt, direction: asc }
      ]
    }
  ) {
    edges {
      node {
        id
        text
        createdAt
        channelId
        assets {
          source
          mimeType
        }
      }
    }
  }
}
"@

$ytResp = Invoke-Buffer -Query $ytQuery
$posts  = $ytResp.data.posts.edges.node

Write-Host "YouTube pending: $($posts.Count)" -ForegroundColor Green

if (-not $posts -or $posts.Count -eq 0) {
  Write-Host "Nenhum post pendente no YouTube retornado pela API." -ForegroundColor Yellow
  exit 0
}

# ==========================
# 2. LER POSTS PENDENTES DO INSTAGRAM
# ==========================

Write-Host "Lendo posts pendentes do Instagram..." -ForegroundColor Cyan

$igQuery = @"
query GetInstagramPosts {
  posts(
    first: 200,
    input: {
      organizationId: "$orgId",
      filter: {
        status: [pending],
        channelIds: ["$channelInstagramId"]
      },
      sort: [
        { field: dueAt, direction: asc }
      ]
    }
  ) {
    edges {
      node {
        id
        text
        channelId
        assets {
          source
          mimeType
        }
      }
    }
  }
}
"@

$igResp  = Invoke-Buffer -Query $igQuery
$igPosts = $igResp.data.posts.edges.node

Write-Host "Instagram pending: $($igPosts.Count)" -ForegroundColor Green

# ==========================
# 3. CALCULAR O QUE FALTA NO IG (POR URL DE VÍDEO)
# ==========================

$igVideoUrls = @()

if ($igPosts) {
  $igVideoUrls = $igPosts |
    Where-Object { $_.assets -and $_.assets[0].mimeType -like "video/*" } |
    ForEach-Object { $_.assets[0].source } |
    Sort-Object -Unique
}

$missingForIg = $posts |
  Where-Object {
    $_.assets -and
    $_.assets[0].mimeType -like "video/*" -and
    ($igVideoUrls -notcontains $_.assets[0].source)
  } |
  Sort-Object createdAt

Write-Host "Faltando no Instagram (por URL de vídeo): $($missingForIg.Count)" -ForegroundColor Yellow

# ==========================
# 4. CLONAR TODOS OS POSTS DO YT -> TIKTOK
# ==========================

Write-Host "Clonando YT -> TikTok..." -ForegroundColor Cyan

$postsOrderedForTiktok = $posts | Sort-Object createdAt
$totalTikTok = $postsOrderedForTiktok.Count
$index = 0

foreach ($post in $postsOrderedForTiktok) {
  $index++

  $text = $post.text
  $videoUrl = $post.assets[0].source

  Write-Host "[$index/$totalTikTok] YT -> TikTok: $($post.id)" -ForegroundColor DarkCyan

  $resTikTok = New-BufferVideoPost -ChannelId $channelTiktokId -Text $text -VideoUrl $videoUrl

  $status = "unknown"
  $error  = $null

  if ($resTikTok -and $resTikTok.post) {
    $status = "created"
  } elseif ($resTikTok -and $resTikTok.message) {
    $status = "error_api"
    $error  = $resTikTok.message
    Write-Host "   Erro TikTok: $error" -ForegroundColor Red
  } elseif ($resTikTok -and $resTikTok.error) {
    $status = "error_exception"
    $error  = $resTikTok.error
    Write-Host "   Exceção TikTok: $error" -ForegroundColor Red
  }

  $log += [pscustomobject]@{
    TargetChannel = "tiktok"
    TargetChannelId = $channelTiktokId
    SourceId     = $post.id
    Status       = $status
    Error        = $error
  }

  Start-Sleep -Milliseconds 700
}

# ==========================
# 5. CLONAR SÓ O QUE FALTA YT -> INSTAGRAM
# ==========================

Write-Host "Clonando YT -> Instagram (somente faltando)..." -ForegroundColor Cyan

$totalIg = $missingForIg.Count
$index = 0

foreach ($post in $missingForIg) {
  $index++

  $text = $post.text
  $videoUrl = $post.assets[0].source

  Write-Host "[$index/$totalIg] YT -> IG: $($post.id)" -ForegroundColor DarkCyan

  $resIg = New-BufferVideoPost -ChannelId $channelInstagramId -Text $text -VideoUrl $videoUrl

  $status = "unknown"
  $error  = $null

  if ($resIg -and $resIg.post) {
    $status = "created"
  } elseif ($resIg -and $resIg.message) {
    $status = "error_api"
    $error  = $resIg.message
    Write-Host "   Erro IG: $error" -ForegroundColor Red
  } elseif ($resIg -and $resIg.error) {
    $status = "error_exception"
    $error  = $resIg.error
    Write-Host "   Exceção IG: $error" -ForegroundColor Red
  }

  $log += [pscustomobject]@{
    TargetChannel = "instagram"
    TargetChannelId = $channelInstagramId
    SourceId     = $post.id
    Status       = $status
    Error        = $error
  }

  Start-Sleep -Milliseconds 700
}

# ==========================
# 6. FINALIZAÇÃO
# ==========================

Write-Host "Sincronização concluída." -ForegroundColor Cyan
Write-Host "Total registros de log: $($log.Count)" -ForegroundColor Cyan

if ($log.Count -gt 0) {
  $log | Export-Csv -Path $logFile -NoTypeInformation -Encoding UTF8
  Write-Host "Log salvo em: $logFile" -ForegroundColor Cyan
}
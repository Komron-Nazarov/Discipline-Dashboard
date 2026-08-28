Add-Type -AssemblyName System.Drawing

$workspace = Split-Path -Parent $PSScriptRoot
$masterSize = 1024
$bitmap = New-Object System.Drawing.Bitmap($masterSize, $masterSize)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.Color]::FromArgb(8, 9, 8))

$background = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(8, 9, 8))
$acid = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(216, 255, 62))
$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(244, 245, 239))
$fontFamily = New-Object System.Drawing.FontFamily('Arial')
$dFont = New-Object System.Drawing.Font($fontFamily, 540, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$osFont = New-Object System.Drawing.Font($fontFamily, 205, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Near
$format.LineAlignment = [System.Drawing.StringAlignment]::Near

$graphics.FillRectangle($background, 0, 0, $masterSize, $masterSize)
$graphics.DrawString('D', $dFont, $acid, 105, 210, $format)
$graphics.DrawString('OS', $osFont, $white, 535, 425, $format)

$masterPath = Join-Path $workspace 'public\brand-icon-1024.png'
$bitmap.Save($masterPath, [System.Drawing.Imaging.ImageFormat]::Png)

function Save-Icon([int]$size, [string]$relativePath) {
  $output = New-Object System.Drawing.Bitmap($size, $size)
  $canvas = [System.Drawing.Graphics]::FromImage($output)
  $canvas.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $canvas.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $canvas.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $canvas.DrawImage($bitmap, 0, 0, $size, $size)
  $path = Join-Path $workspace $relativePath
  $output.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Dispose()
  $output.Dispose()
}

Save-Icon 512 'public\icon-512x512.png'
Save-Icon 192 'public\icon-192x192.png'
Save-Icon 512 'app\icon.png'
Save-Icon 180 'app\apple-icon.png'

$format.Dispose()
$dFont.Dispose()
$osFont.Dispose()
$fontFamily.Dispose()
$acid.Dispose()
$white.Dispose()
$background.Dispose()
$graphics.Dispose()
$bitmap.Dispose()

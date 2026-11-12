Add-Type -AssemblyName System.Drawing

function Create-AtariIcon {
    param(
        [int]$width,
        [int]$height,
        [string]$filePath
    )

    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::FromArgb(255, 10, 14, 23))

    $brushRed = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 230, 35, 20))
    $penBlue = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 44, 89, 217), [float]($width / 14))

    # Center column
    $colWidth = [int]($width * 0.12)
    $colX = [int](($width - $colWidth) / 2)
    $colY = [int]($height * 0.15)
    $colH = [int]($height * 0.70)
    $g.FillRectangle($brushRed, $colX, $colY, $colWidth, $colH)

    # Arches
    $g.DrawArc($penBlue, [float]($width * 0.10), [float]($height * 0.2), [float]($width * 0.55), [float]($height * 0.65), 180, 90)
    $g.DrawArc($penBlue, [float]($width * 0.35), [float]($height * 0.2), [float]($width * 0.55), [float]($height * 0.65), 270, 90)

    $bmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created $filePath ($width x $height)"
}

Create-AtariIcon -width 80 -height 80 -filePath "webos/icon.png"
Create-AtariIcon -width 130 -height 130 -filePath "webos/largeIcon.png"


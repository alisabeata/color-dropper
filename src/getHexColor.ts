import { convertRgbToHex } from './convertRgbToHex'

function getHexColor(
  contextOriginal: CanvasRenderingContext2D,
  x: number,
  y: number,
): string {
  // Get the pixel data at the mouse coordinates
  const pixelData = contextOriginal.getImageData(x, y, 1, 1).data
  const hex = convertRgbToHex(pixelData[0], pixelData[1], pixelData[2])

  return hex
}

export { getHexColor }

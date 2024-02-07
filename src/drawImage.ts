import { addZoomLens } from './addZoomLens'

function drawImage(
  url: string,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
): void {
  const img = new Image()
  img.src = url
  img.addEventListener('load', function () {
    const windowsWidth = window.innerWidth
    const originalWidth = img.width
    const originalHeight = img.height

    // Calculate the corresponding height to maintain the original aspect ratio
    const aspectRatio = originalWidth / originalHeight
    const newHeight = windowsWidth / aspectRatio

    // Set canvas size to match image
    canvas.width = windowsWidth
    canvas.height = newHeight

    // Draw Image
    context.drawImage(img, 0, 0, windowsWidth, newHeight)

    // Add Lens
    addZoomLens(canvas, context)
  })
}

export { drawImage }

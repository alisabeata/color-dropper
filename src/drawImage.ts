import { addZoomLens } from './addZoomLens'

function drawImage(
  url: string,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
): void {
  const img = new Image()
  img.src = url
  img.addEventListener('load', function () {
    const windowWidth = Math.min(window.innerWidth, 1000);
    const originalWidth = img.width
    const originalHeight = img.height

    // Calculate the corresponding height to maintain the original aspect ratio
    const aspectRatio = originalWidth / originalHeight
    const newHeight = windowWidth / aspectRatio

    // Set canvas size to match image
    canvas.width = windowWidth
    canvas.height = newHeight

    // Draw Image
    context.drawImage(img, 0, 0, windowWidth, newHeight)

    // Add Lens
    addZoomLens(canvas, context)
  })
}

export { drawImage }

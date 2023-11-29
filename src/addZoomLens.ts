import { debounce } from './utils/debounce'
import { getHexColor } from './getHexColor'
import { createLensCircle } from './createLensCircle'
import { addColorData } from './addColorData'

function addZoomLens(
  canvasOriginal: HTMLCanvasElement,
  contextOriginal: CanvasRenderingContext2D,
): void {
  const canvas: HTMLCanvasElement = document.querySelector('#canvas-lens')!
  const textElement: HTMLElement = document.querySelector('#color-lens')!
  const colorElement: HTMLElement = document.querySelector('.color')!
  const colorPreview: HTMLElement = document.querySelector('.color-preview')!
  const dropperBtn: HTMLElement = document.querySelector('.dropper-btn')!
  const canvasContainer: HTMLElement =
    document.querySelector('.canvas-container')!
  const context: CanvasRenderingContext2D = canvas.getContext('2d')!
  const canvasSize = canvas.width
  const zoom = 8
  const shiftToCenter = 3

  let hex: string | undefined
  let showDropper: boolean = false

  // Toggle Dropper
  dropperBtn.addEventListener('click', function () {
    canvasContainer.classList.toggle('show-dropper')
    showDropper = !showDropper

    if (!showDropper) {
      colorElement.textContent = ''
      colorPreview.style.setProperty('background-color', 'white')
    }
  })

  // Add the lens by mousemove without debounce using requestAnimationFrame
  canvasOriginal.addEventListener(
    'mousemove',
    debounce(function addLensByMouseMove(event) {
      if (showDropper) {
        requestAnimationFrame(() => {
          // Get the mouse position
          const containerRect = canvasOriginal.getBoundingClientRect()
          const mouseX = event.clientX - containerRect.left
          const mouseY = event.clientY - containerRect.top

          // Set styles
          canvas.style.display = 'block'
          textElement.style.display = 'flex'
          context.fillStyle = 'white'
          context.fillRect(0, 0, canvasSize, canvasSize)

          // turn off image aliasing

          context.imageSmoothingEnabled = false

          // Draw a zoomed background
          context.drawImage(
            canvasOriginal,
            mouseX - canvasSize / zoom,
            mouseY - canvasSize / zoom,
            canvasSize + shiftToCenter,
            canvasSize + shiftToCenter,
            0 - canvasSize / 2,
            0 - canvasSize / 2,
            canvasSize * zoom,
            canvasSize * zoom,
          )

          // Get the hex color by mousemove
          hex = getHexColor(contextOriginal, mouseX, mouseY)

          // Add border
          if (hex) {
            createLensCircle(canvas, context, hex)
          }

          // Update the canvas position based on mouse coordinates
          canvas.style.transform = `translate(${
            mouseX - canvasSize / 2 + shiftToCenter
          }px, ${mouseY - canvasSize / 2 + shiftToCenter}px)`

          // Add color data
          if (hex) {
            addColorData(textElement, mouseX, mouseY, hex)
          }
        })
      }
    }, 4),
  )

  // Save color by click
  canvasOriginal.addEventListener('click', function saveColorByClick() {
    if (hex && showDropper) {
      colorElement.textContent = hex
      colorPreview.style.setProperty('background-color', hex)
    }
  })

  // Hide the zoom element if it's not over the canvas
  document.addEventListener('mousemove', function hideLensByMouseMove(event) {
    if ((event.target as HTMLElement).tagName !== 'CANVAS') {
      canvas.style.display = 'none'
      textElement.style.display = 'none'
    }
  })
}

export { addZoomLens }

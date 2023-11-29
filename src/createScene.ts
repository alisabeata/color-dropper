import { drawImage } from './drawImage'

function createScene(): void {
  // Get Element
  const canvas: HTMLCanvasElement = document.querySelector('#canvas-picker')!
  const context: CanvasRenderingContext2D = canvas.getContext('2d')!

  // Draw Image
  drawImage('images/1920x1080-img-min.jpg', canvas, context)
}

export { createScene }

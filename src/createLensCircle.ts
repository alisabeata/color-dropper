function createLensCircle(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  hex: string,
) {
  // Set the border color and draw an empty circle
  context.strokeStyle = hex
  context.lineWidth = 20

  // Align the coordinates and properties
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = 80

  // Set the shadow properties
  context.shadowColor = 'rgba(0, 0, 0, 0.2)' // Shadow color with transparency
  context.shadowBlur = 2 // Blur radius
  context.shadowOffsetX = 0 // Shadow offset in the x-axis
  context.shadowOffsetY = 1 // Shadow offset in the y-axis

  // Add circle
  context.beginPath()
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  context.stroke()
  context.closePath()
}

export { createLensCircle }

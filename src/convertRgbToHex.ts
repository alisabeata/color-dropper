function convertColor(color: number) {
  // Check RGB values range to be 0-255
  const colorRes = Math.min(255, Math.max(0, color))
  // Convert each component to hex
  const hexColor = colorRes.toString(16).padStart(2, '0')

  return hexColor.toUpperCase()
}

function convertRgbToHex(red: number, green: number, blue: number): string {
  return `#${convertColor(red)}${convertColor(green)}${convertColor(blue)}`
}

export { convertColor, convertRgbToHex }

function addColorData(
  textElement: HTMLElement,
  x: number,
  y: number,
  hex: string,
) {
  textElement.textContent = hex

  textElement.style.transform = `translate(${x}px, ${y}px)`
}

export { addColorData }

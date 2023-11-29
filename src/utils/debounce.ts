function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null

  return function (this: ThisParameterType<T>) {
    const context = this
    const args = [...arguments]

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(function () {
      func.apply(context, args)
      timeoutId = null
    }, delay)
  }
}

export { debounce }

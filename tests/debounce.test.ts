import { debounce } from '../src/utils/debounce'

describe('debounce function', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('delays the execution of the function', () => {
    const mockFunction = jest.fn()
    const debouncedFunction = debounce(mockFunction, 200)

    debouncedFunction()
    debouncedFunction()
    debouncedFunction()

    jest.runAllTimers()

    expect(mockFunction).toHaveBeenCalledTimes(1)
  })

  test('handles multiple invocations within the delay period', () => {
    const mockFunction = jest.fn()
    const debouncedFunction = debounce(mockFunction, 200)

    debouncedFunction()
    debouncedFunction()
    debouncedFunction()

    jest.runAllTimers()

    expect(mockFunction).toHaveBeenCalledTimes(1)
  })

  test('preserves the context and arguments of the original function', () => {
    const mockFunction = jest.fn()
    const debouncedFunction = debounce(mockFunction, 200)

    const context = { key: 'value' }

    debouncedFunction.call(context, 42, 'hello')

    jest.runAllTimers()

    expect(mockFunction).toHaveBeenCalledWith(42, 'hello')
    expect(mockFunction.mock.instances[0]).toBe(context)
  })
})

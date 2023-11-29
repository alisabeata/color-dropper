import { addColorData } from '../src/addColorData'
import { JSDOM } from 'jsdom'

const dom = new JSDOM()
global.document = dom.window.document

describe('addColorData function', () => {
  test('sets text content and transform styles', () => {
    const textElementMock: HTMLElement = document.createElement('div')

    addColorData(textElementMock, 50, 30, '#FF0000')
    expect(textElementMock.textContent).toBe('#FF0000')
    expect(textElementMock.style.transform).toBe('translate(50px, 30px)')
  })

  test('handles different coordinates and colors', () => {
    const textElementMock: HTMLElement = document.createElement('div')

    addColorData(textElementMock, 100, 75, '#00FF00')
    expect(textElementMock.textContent).toBe('#00FF00')
    expect(textElementMock.style.transform).toBe('translate(100px, 75px)')
  })
})

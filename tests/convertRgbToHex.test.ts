import { convertColor, convertRgbToHex } from '../src/convertRgbToHex'

describe('convertColor function', () => {
  test('converts color to uppercase hex', () => {
    expect(convertColor(128)).toBe('80');
    expect(convertColor(255)).toBe('FF');
    expect(convertColor(0)).toBe('00');

    // Clamps out-of-range values
    expect(convertColor(-5)).toBe('00');
    expect(convertColor(300)).toBe('FF');

    // Handles edge cases
    expect(convertColor(255)).toBe('FF');
    expect(convertColor(0)).toBe('00');

    // Zero-pads single-digit values
    expect(convertColor(5)).toBe('05');
  });
})

describe('convertRgbToHex function', () => {
  test('converts RGB values to hexadecimal', () => {
    // Test with some RGB values
    expect(convertRgbToHex(255, 0, 128)).toBe('#FF0080')
    expect(convertRgbToHex(0, 128, 255)).toBe('#0080FF')
    expect(convertRgbToHex(0, 0, 0)).toBe('#000000')
  })

  test('handles out-of-range RGB values', () => {
    // Test with out-of-range RGB values
    expect(convertRgbToHex(-10, 300, 500)).toBe('#00FFFF')
  })
})

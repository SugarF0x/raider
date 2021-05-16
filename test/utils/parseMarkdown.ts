import { parseMarkdown } from '~/assets/utils'

export function parseMarkdownTest() {
  describe('parseMarkdown', () => {
    test('Outline markdown', () => {
      const outlineMock = '10-590/430-150'
      const expectedOutcome = {
        x: 10.0,
        y: 590.0,
        width: 430.0,
        height: 150.0,
      }
      expect(parseMarkdown({ data: outlineMock })).toEqual(expectedOutcome)
    })
    test('Outline markdown with matching fields', () => {
      const outlineMock = '10/430'
      const expectedOutcome = {
        x: 10.0,
        y: 10.0,
        width: 430.0,
        height: 430.0,
      }
      expect(parseMarkdown({ data: outlineMock })).toEqual(expectedOutcome)
    })
    test('Outline markdown with stroke', () => {
      const outlineMock = '10-590/430-150'
      const expectedOutcome = {
        x: 10.0,
        y: 590.0,
        width: 430.0,
        height: 150.0,
      }
      expect(parseMarkdown({ data: outlineMock })).toEqual(expectedOutcome)
    })
  })
}
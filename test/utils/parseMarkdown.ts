import { parseMarkdown } from '~/assets/utils'
import { BACKGROUND_COLOR, STROKE_COLOR } from "~/assets/consts/konva"

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
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Outline markdown with matching fields', () => {
      const outlineMock = '10/430'
      const expectedOutcome = {
        x: 10.0,
        y: 10.0,
        width: 430.0,
        height: 430.0,
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Outline markdown with stroke', () => {
      const outlineMock = '10-590/430-150;S'
      const expectedOutcome = {
        x: 10.0,
        y: 590.0,
        width: 430.0,
        height: 150.0,
        stroke: STROKE_COLOR,
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Outline markdown with fill', () => {
      const outlineMock = '10-590/430-150;F'
      const expectedOutcome = {
        x: 10.0,
        y: 590.0,
        width: 430.0,
        height: 150.0,
        fill: BACKGROUND_COLOR,
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Outline markdown with stroke & fill', () => {
      const outlineMock = '10-590/430-150;FS'
      const expectedOutcome = {
        x: 10.0,
        y: 590.0,
        width: 430.0,
        height: 150.0,
        fill: BACKGROUND_COLOR,
        stroke: STROKE_COLOR,
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    // Image variants can not be tested since they rely on setup()
  })
}
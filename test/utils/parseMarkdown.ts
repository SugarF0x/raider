import { parseMarkdown } from '~/assets/utils'
import { BACKGROUND_COLOR, STROKE_COLOR } from "~/assets/consts/konva"
import { defineComponent, h } from '@nuxtjs/composition-api'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from "@vue/test-utils"
import { useAccessor } from "typed-vuex"
import Vue from 'vue'

export function parseMarkdownTest() {
  describe('parseMarkdown', () => {
    test('Outline markdown', () => {
      const outlineMock = '10-590/430-150'
      const expectedOutcome = {
        x: 10,
        y: 590,
        width: 430,
        height: 150,
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Outline markdown with matching fields', () => {
      const outlineMock = '10/430'
      const expectedOutcome = {
        x: 10,
        y: 10,
        width: 430,
        height: 430,
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Outline markdown with stroke', () => {
      const outlineMock = '10-590/430-150;S'
      const expectedOutcome = {
        x: 10,
        y: 590,
        width: 430,
        height: 150,
        stroke: STROKE_COLOR,
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Outline markdown with fill', () => {
      const outlineMock = '10-590/430-150;F'
      const expectedOutcome = {
        x: 10,
        y: 590,
        width: 430,
        height: 150,
        fill: BACKGROUND_COLOR,
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Outline markdown with stroke & fill', () => {
      const outlineMock = '10-590/430-150;FS'
      const expectedOutcome = {
        x: 10,
        y: 590,
        width: 430,
        height: 150,
        fill: BACKGROUND_COLOR,
        stroke: STROKE_COLOR,
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Image crop from tiles', () => {
      const outlineMock = '158-708.5/134-18.5:397-501/100-10;T'
      const expectedOutcome = {
        x: 158,
        y: 708.5,
        width: 134,
        height: 18.5,
        crop: {
          x: 397,
          y: 501,
          width: 100,
          height: 10
        },
        image: 'tiles'
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    // should this even be here? it's like identical to the former test
    test('Image crop from icons', () => {
      const outlineMock = '158-708.5/134-18.5:397-501/100-10;I'
      const expectedOutcome = {
        x: 158,
        y: 708.5,
        width: 134,
        height: 18.5,
        crop: {
          x: 397,
          y: 501,
          width: 100,
          height: 10
        },
        image: 'icons'
      }
      expect(parseMarkdown(outlineMock)).toEqual(expectedOutcome)
    })
    test('Image crop from both tiles and icons throws error', () => {
      const outlineMock = '158-708.5/134-18.5:397-501/100-10;IT'
      const t = () => {
        parseMarkdown(outlineMock)
      }
      expect(t).toThrowError()
    })
  })
}

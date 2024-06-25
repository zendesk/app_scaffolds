import { expect, it, describe, beforeAll, vi } from 'vitest'
import I18n from '../src/lib/i18n'

const i18n = new I18n()

const mockEN = {
  one: 'the first translation',
  'two.one': 'the second translation for: {{fname}}',
  'two.two': 'the second translation for: {{fname}}-{{lname}}',
  'three.one.one': 'the third translation from {{name}} for {{name}} should be {{name}}',
  four: {}
}

describe('i18n', () => {
  beforeAll(async () => {
    vi.mock('../src/translations/en.json', () => {
      return { default: mockEN }
    })

    vi.mock('../src/translations/fr.json', () => {
      throw new Error('no such file')
    })

    await i18n.loadTranslations('en')
  })

  describe('#loadTranslations', () => {
    it('return undefined for fr and fallback to en', async () => {
      await i18n.loadTranslations('fr')
      const result = i18n.t('one')
      expect(result).toBe('the first translation')
    })
  })

  describe('#tryRequire', () => {
    it('returns a json if the file exists', async () => {
      const result = await i18n.tryRequire('en')

      expect(result.default).toEqual(mockEN)
    })

    it("returns null if the file doesn't exist", async () => {
      const result = await i18n.tryRequire('fr')
      expect(result).toBe(null)
    })
  })

  describe('#t', () => {
    it('returns a string', () => {
      const result = i18n.t('one')
      expect(result).toBe('the first translation')
    })

    it('interpolates one string', () => {
      const result = i18n.t('two.one', {
        fname: 'Olaf'
      })
      expect(result).toBe('the second translation for: Olaf')
    })

    it('interpolates multiple strings', () => {
      const result = i18n.t('two.two', {
        fname: 'Olaf',
        lname: 'K'
      })
      expect(result).toBe('the second translation for: Olaf-K')
    })

    it('interpolates duplicates strings', () => {
      const result = i18n.t('three.one.one', {
        name: 'Olaf'
      })
      expect(result).toBe('the third translation from Olaf for Olaf should be Olaf')
    })

    it('should throw error if translate keyword is not string', function () {
      expect(() => {
        i18n.t({})
      }).toThrow()
    })

    it('should throw error if translation is not a string', function () {
      expect(() => {
        i18n.t('four')
      }).toThrow()
    })

    it('should throw error if translate keyword is missing in the language file', function () {
      expect(() => {
        i18n.t('five')
      }).toThrow()
    })
  })
})

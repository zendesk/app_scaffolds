class I18n {
  constructor() {
    this.translations = {}
  }

  static getRetries(locale) {
    return [locale, locale.replace(/-.+$/, ''), 'en']
  }

  tryRequire = async (locale) => {
    try {
      const result = await import(`../translations/${locale}.json`)
      return result
    } catch (e) {
      return null
    }
  }

  loadTranslations = async (locale) => {
    const intentLocales = I18n.getRetries(locale)

    do {
      try {
        const importedTranslations = await this.tryRequire(intentLocales[0])
        if (importedTranslations.default) {
          this.translations = importedTranslations.default
          break
        }
      } catch (error) {
        intentLocales.shift()
      }
    } while (intentLocales.length)
  }

  t = (key, context = {}) => {
    const keyType = typeof key
    if (keyType !== 'string') throw new Error(`Translation key must be a string, got: ${keyType}`)

    const template = this.translations[key]
    if (!template) throw new Error(`Missing translation: ${key}`)
    if (typeof template !== 'string') throw new Error(`Invalid translation for key: ${key}`)

    return template.replace(/{{(.*?)}}/g, (_, match) => context[match] || '')
  }
}

export default I18n

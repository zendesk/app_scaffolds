const marketplaceKeys = [
  'name',
  'description',
  'short_description',
  'long_description',
  'installation_instructions',
  'parameters'
]

const JS_INDENT = 2

export function extractMarketplaceTranslation(content, filename) {
  const translations = JSON.parse(content)

  const translationsOutput = {
    _warning: `AUTOMATICALLY GENERATED FROM $/src/translations/${filename} - DO NOT MODIFY THIS FILE DIRECTLY`,
    app: {}
  }

  marketplaceKeys.forEach((key) => {
    if (translations.app[key]) translationsOutput.app[key] = translations.app[key]
  })

  return JSON.stringify(translationsOutput, null, JS_INDENT)
}

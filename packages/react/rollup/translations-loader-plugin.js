import fs from 'fs/promises'
import path from 'path'

function translationFlatten(object, currentKeys = []) {
  const res = {}

  Object.keys(object).forEach((key) => {
    const value = object[key]

    if (typeof value === 'object') {
      if (value.title && value.value) {
        const flattenedKey = [...currentKeys, key].join('.')
        res[flattenedKey] = value.value
      } else {
        Object.assign(res, translationFlatten(value, [...currentKeys, key]))
      }
    } else {
      const flattenedKey = [...currentKeys, key].join('.')
      res[flattenedKey] = value
    }
  })

  return res
}

export default function TranslationsLoader() {
  return {
    name: 'translations-loader',
    transform: async (_, id) => {
      if (id.endsWith('.json') && id.includes(path.resolve(__dirname, '../src/translations'))) {
        const contentFile = await fs.readFile(id)

        const translations = JSON.parse(contentFile)

        return {
          code: `export default ${JSON.stringify(translationFlatten(translations))};`,
          map: null
        }
      }
      return null
    }
  }
}

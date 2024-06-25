import { createContext, useState, useEffect, useCallback } from 'react'
import { useClient } from '../hooks/useClient'
import I18n from '../../lib/i18n'

export const TranslationContext = createContext()

const i18n = new I18n()

export function TranslationProvider({ children }) {
  const client = useClient()
  const [locale, setLocale] = useState()
  const [loading, setLoading] = useState(true)

  const loadTranslations = useCallback(
    async (currentLocale) => {
      const { currentUser } = await client.get('currentUser')

      const locale = currentLocale || currentUser.locale

      await i18n.loadTranslations(locale)
      setLoading(false)
    },
    [client]
  )

  useEffect(() => {
    loadTranslations(locale)
  }, [locale, loadTranslations])

  if (loading) return null

  return <TranslationContext.Provider value={{ i18n, setLocale }}>{children}</TranslationContext.Provider>
}

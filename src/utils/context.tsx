import React, { createContext, useContext, useState, useEffect } from 'react'
import { isRefreshTokenValid } from './auth'
import { useRouter } from 'next/router'
import config from './config'
import { Theme, Locale, AppContextInterface } from './types'

const AppContext = createContext<AppContextInterface>({
  theme: config.defaultTheme as Theme,
  setTheme: () => {},
  locale: config.defaultLocale as Locale,
  setLocale: () => {},
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
})

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [firstLoad, setFirstLoad] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [theme, setTheme] = useState(config.defaultTheme as Theme)
  const [locale, setLocale] = useState(config.defaultLocale as Locale)
  const [user, setUser] = useState(null)

  let sharedState = {
    theme,
    setTheme,
    locale,
    setLocale,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  }

  useEffect(() => {
    if (!window) return
    if (firstLoad) {
      let theme: Theme = (localStorage.getItem('theme') || config.defaultTheme) as Theme
      let locale: Locale = (localStorage.getItem('locale') || config.defaultLocale) as Locale
      let user = localStorage.getItem('user') || null
      setTheme(theme)
      setLocale(locale)
      router.push(router.asPath, undefined, { locale: locale })

      if (user === null) {
        setUser(null)
      } else {
        setUser(JSON.parse(user))
      }

      setFirstLoad(false)
    } else {
      localStorage.setItem('theme', theme)
      localStorage.setItem('locale', locale)
      setTheme(theme)
      if (theme === 'light') {
        document?.querySelector('html')?.classList.remove('dark')
      } else {
        document?.querySelector('html')?.classList.remove('light')
      }
      document?.querySelector('html')?.classList.add(theme)

      if (user === null || user === undefined) {
        setUser(null)
      } else {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
      }
      setLocale(locale)
    }

    if (!isRefreshTokenValid()) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [theme, locale, user, router])

  return (
    <AppContext.Provider value={sharedState}>
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>{children}</div>
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}

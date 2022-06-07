export type Theme = 'dark' | 'light'

export type Locale = 'en' | 'fr'

export type User = {
  id: string
  username: string
  email: string
}
export interface AppContextInterface {
  theme: Theme
  setTheme: Function
  locale: Locale
  setLocale: Function
  user: User | null
  setUser: Function
  isLoggedIn: Boolean
  setIsLoggedIn: Function
}

export type ErrorType = {
  message: string
  code: string
}

// QUERY/MUTATION DATA TYPE

export type meQuery = {
  me: User
}

export type loginQuery = {
  login: {
    accessToken: string
    refreshToken: string
  }
}

export type registerMutation = {
  register: {
    accessToken: string
    refreshToken: string
  }
}

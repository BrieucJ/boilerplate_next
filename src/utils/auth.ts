import jwtDecode from 'jwt-decode'

export type DecodedToken = {
  readonly email: string
  readonly iat: number
  readonly exp: number
}

export const getAccessToken = (): string => {
  return sessionStorage.getItem('accessToken') || ''
}

export const setAccessToken = (token: string): void => {
  sessionStorage.setItem('accessToken', token)
}

export const getRefreshToken = (): string => {
  return sessionStorage.getItem('refreshToken') || ''
}

export const setRefreshToken = (token: string): void => {
  sessionStorage.setItem('refreshToken', token)
}

export const isRefreshTokenValid = (): boolean => {
  const refreshToken = getRefreshToken()
  try {
    const decodedToken: DecodedToken = jwtDecode(refreshToken)
    if (decodedToken.exp * 1000 > new Date().getTime()) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

export const isAccessTokenValid = (): boolean => {
  const accessToken = getAccessToken()
  try {
    const decodedToken: DecodedToken = jwtDecode(accessToken)
    if (decodedToken.exp * 1000 > new Date().getTime()) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

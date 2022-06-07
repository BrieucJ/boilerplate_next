import styles from '../styles/Header.module.css'
import config from '../utils/config'
import Link from 'next/link'
import { useAppContext } from '../utils/context'
import { useRouter } from 'next/router'
import { setAccessToken, setRefreshToken } from 'src/utils/auth'
import { useApolloClient } from '@apollo/client'
import { useTranslation } from 'next-i18next'

const Header = () => {
  const { t } = useTranslation('common')
  const client = useApolloClient()
  const router = useRouter()
  const { theme, setTheme, isLoggedIn, setIsLoggedIn } = useAppContext()

  const logOut = async (): Promise<void> => {
    await client.resetStore()
    setIsLoggedIn(false)
    setAccessToken('')
    setRefreshToken('')
    sessionStorage.clear()
    localStorage.removeItem('user')
    await router.push('/')
    return
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href={'/'}>{config.appName}</Link>
      </div>
      <div>
        <button
          className={styles.btn}
          onClick={() => {
            theme === 'light' ? setTheme('dark') : setTheme('light')
          }}
        >
          {theme === 'light' ? 'dark' : 'light'}
        </button>
        {!isLoggedIn ? (
          <>
            <Link href={'/account/login'} passHref>
              <button className={styles.btn}>{t('login')}</button>
            </Link>
            <Link href={'/account/register'} passHref>
              <button className={styles.btn}>{t('register')}</button>
            </Link>
          </>
        ) : (
          <button className={styles.btn} onClick={() => logOut()}>
            {t('logout')}
          </button>
        )}
      </div>
    </div>
  )
}

export default Header

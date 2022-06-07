import styles from '../../styles/Login.module.css'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { handleErrors } from '../../utils/errorHandler'
import Layout from 'src/components/layout'
import { LOGIN_QUERY } from '../../gql/queries'
import { setAccessToken, setRefreshToken } from 'src/utils/auth'
import { useTranslation } from 'next-i18next'
import { loginQuery } from '../../utils/types'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

const Login: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [loginUser, { error, data }] = useLazyQuery<loginQuery>(LOGIN_QUERY)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()
    await loginUser({ variables: { email, password } })
  }

  useEffect(() => {
    if (data?.login?.accessToken) {
      setAccessToken(data.login.accessToken)
      setRefreshToken(data.login.refreshToken)
      router.push('/').catch((err) => console.log(err))
    }
  }, [data, router])

  return (
    <Layout>
      {handleErrors(error).map((err) => {
        return (
          <div className={styles.error_msg} key={err.message}>
            {err.message}
          </div>
        )
      })}
      <form className={styles.container} onSubmit={onSubmit}>
        <input onChange={(e) => setEmail(e.target.value)} className={styles.input} type="text" id="email_input" name="email" placeholder={t('email')} />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          type="password"
          id="password_input"
          name="password"
          placeholder={t('password')}
        />
        <button type="submit">{t('login')}</button>
      </form>
    </Layout>
  )
}

export default Login

import styles from 'src/styles/Register.module.css'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { handleErrors } from 'src/utils/errorHandler'
import Layout from 'src/components/layout'
import { REGISTER_MUTATION } from 'src/gql/mutations'
import { setAccessToken, setRefreshToken } from 'src/utils/auth'
import { useTranslation } from 'next-i18next'
import { registerMutation } from '../../utils/types'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

const Register: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [registerUser, { error, data }] = useMutation<registerMutation>(REGISTER_MUTATION)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    console.log('onSubmit')
    e.preventDefault()
    await registerUser({ variables: { username, email, password } })
  }

  useEffect(() => {
    console.log('useEffect')
    if (data?.register?.accessToken) {
      setAccessToken(data.register.accessToken)
      setRefreshToken(data.register.refreshToken)
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
        <input
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          type="text"
          id="username_input"
          name="username"
          placeholder={t('username')}
        />
        <input onChange={(e) => setEmail(e.target.value)} className={styles.input} type="text" id="email_input" name="email" placeholder={t('email')} />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          type="password"
          id="password_input"
          name="password"
          placeholder={t('password')}
        />
        <button type="submit">{t('register')}</button>
      </form>
    </Layout>
  )
}

export default Register

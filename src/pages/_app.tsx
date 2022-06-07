import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../utils/apolloClient'
import { ContextProvider } from '../utils/context'
import NextI18nextConfig from '../../next-i18next.config'

function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
  const apolloClient = useApollo(pageProps.initialApolloState)

  // console.log(JSON.stringify(i18n, null, 2))
  // if (typeof window !== 'undefined') {
  //   if (!sessionStorage.length) {
  //     // Ask other tabs for session storage
  //     console.log('Calling getSessionStorage')
  //     localStorage.setItem('getSessionStorage', String(Date.now()))
  //   }

  //   window.addEventListener('storage', (event) => {
  //     console.log('storage event', event)
  //     if (event.key == 'getSessionStorage') {
  //       // Some tab asked for the sessionStorage -> send it
  //       localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
  //       localStorage.removeItem('sessionStorage')
  //     } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
  //       // sessionStorage is empty -> fill it
  //       let data
  //       if (event.newValue) {
  //         data = JSON.parse(event.newValue)
  //       }
  //       for (let key in data) {
  //         sessionStorage.setItem(key, data[key])
  //       }
  //     }
  //   })
  // }
  return (
    <ApolloProvider client={apolloClient}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ApolloProvider>
  )
}

export default appWithTranslation(App, NextI18nextConfig)

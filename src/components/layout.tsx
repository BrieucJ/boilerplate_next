import React from 'react'
import Footer from './footer'
import Header from './header'
import Script from 'next/script'
import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import { APP_NAME } from '../utils/config'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content="desc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="/theme.js" strategy="beforeInteractive" />
      <div>
        <Header />
        <div className={styles.main}>{children}</div>
        <Footer />
      </div>
    </>
  )
}

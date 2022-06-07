import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/layout'
import Dashboard from 'src/components/dashboard'
import Landing from 'src/components/landing'
import { useAppContext } from 'src/utils/context'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'header'])),
    },
  }
}

const Index = () => {
  const { isLoggedIn } = useAppContext()
  if (isLoggedIn) {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Landing />
      </Layout>
    )
  }
}

export default Index

import Link from 'next/link'
import Layout from '../components/layout'

export default function FourOhFour() {
  return (
    <Layout>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </Layout>
  )
}

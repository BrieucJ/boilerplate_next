import styles from '../styles/Footer.module.css'
import Link from 'next/link'
import Locale from './locale'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_left}>
        <div className={styles.link}>
          <Link href={'/tos'}>Terms of service</Link>
        </div>
        <div className={styles.link}>
          <Link className={styles.link} href={'/privacy'}>
            Privacy policy
          </Link>
        </div>
      </div>
      <Locale />
    </div>
  )
}

export default Footer

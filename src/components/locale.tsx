import React, { ChangeEvent } from 'react'
import { useAppContext } from '../utils/context'
import { useRouter } from 'next/router'

const Locale = () => {
  const router = useRouter()
  const { locale, setLocale } = useAppContext()

  const changeLocale = async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const locale = event.target.value
    setLocale(locale)
    await router.push(router.asPath, undefined, { locale: locale })
  }

  return (
    <div>
      <select value={locale} name="locale" onChange={changeLocale}>
        <option value={'fr'}>FR</option>
        <option value={'en'}>EN</option>
      </select>
    </div>
  )
}

export default Locale

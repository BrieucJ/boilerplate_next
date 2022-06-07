import { useTranslation } from 'next-i18next'

const Landing = () => {
  const { t } = useTranslation('common')
  return <div>{t('test')}</div>
}

export default Landing

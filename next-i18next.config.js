const I18NextHttpBackend = require('i18next-http-backend/cjs')

const I18N_LOCALES = ['en', 'fr']
const I18N_NAMESPACES = ['common']

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: I18N_LOCALES,
    localeDetection: false,
    backend: {
      loadPath: '{{lng}}/{{ns}}',
      request: (options, url, payload, callback) => {
        fetch(process.env.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `query getTranslations($locale: String!, $ns: String! ) {
                      translations(locale: $locale, ns: $ns ) {
                        key,
                        value
                        }
                      }`,
            variables: {
              locale: url.split('/')[0].replace(/{}/g, ''),
              ns: url.split('/')[1].replace(/{}/g, ''),
            },
          }),
        })
          .then((req) => {
            const res = req.json()
            return res
          })
          .then((res) => {
            const data = res.data.translations.reduce((acc, el) => {
              acc[el.key] = el.value
              return acc
            }, {})
            callback(null, { status: 200, data: data })
            return res
          })
          .catch((err) => callback(err))
      },
    },
  },
  debug: false,
  ns: I18N_NAMESPACES,
  serializeConfig: false,
  use: [I18NextHttpBackend],
}

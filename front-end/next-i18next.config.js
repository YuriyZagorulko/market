const path = require('path')
module.exports = {
    debug: process.env.NODE_ENV === 'development',
    i18n: {
      defaultLocale: "ua",
      locales: ["ua", "ru"],
    },
    defaultNS:'common',
    react: { useSuspense: false },//this line,
    localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  };
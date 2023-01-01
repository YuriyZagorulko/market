const path = require('path')
module.exports = {
    i18n: {
      defaultLocale: "ua",
      locales: ["ua", "ru"],
    },
    react: { useSuspense: true },//this line,
    localePath:	'public/locales',     //  Problem persist if i comment this line and use ./static/locales
  };
import 'i18next'

import type common from '../public/locales/ua/common.json'
import type home from '../public/locales/ua/home.json'
import type auth from '../public/locales/ua/auth.json'
import type checkout from '../public/locales/ua/checkout.json'
import type contactUs from '../public/locales/ua/contact-us.json'
import type product from '../public/locales/ua/product.json'
import type layout from '../public/locales/ua/layout.json'
import type search from '../public/locales/ua/search.json'
import type orders from '../public/locales/ua/orders.json'
import type sharedUI from '../public/locales/ua/sharedUI.json'


interface I18nNamespaces {
  common: typeof common
  home: typeof home
  auth: typeof auth
  checkout: typeof checkout
  'contact-us': typeof contactUs
  layout: typeof layout
  product: typeof product
  orders: typeof orders
  sharedUI: typeof sharedUI
  search: typeof search

}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: I18nNamespaces
  }
}
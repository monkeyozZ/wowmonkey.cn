const apiConfig = require('./config/api.config')
// const path = require('path')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Monkey个人博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#007fff' },

  /*
   ** Global Css
   */
  css: [
    'swiper/dist/css/swiper.css',
    '~/assets/css/style.css',
    'highlight.js/styles/dracula.css',
    '~/assets/css/iconfont/iconfont.css',
    '~/assets/css/github-markdown.css'
  ],
  dev: Object.is(process.env.NODE_ENV, 'production'),
  env: {
    baseUrl: apiConfig.baseUrl,
    host: 'http://wowmonkey.cn'
  },
  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/marked.js' },
    { src: '~/plugins/image-popup.js', ssr: false },
    { src: '~/plugins/gravatar.js' },
    { src: '~/plugins/highlight.js' },
    { src: '~/plugins/filters.js' }
  ],
  router: {
    middleware: 'responsive'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    loaders: [],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push(
          {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        }
      )
      }
    },
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ],
      comments: true
    },
    vendor: [
      'axios',
      'swiper',
      'marked',
      'gravatar'
    ]
  }
}


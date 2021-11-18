// const path = require('path')
import * as path from 'path'
const apiConfig = import('./config/api.config')
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
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
  loading: { color: '#007fff' },
  /*
  ** Global CSS
  */
  css: [
    // 'swiper/dist/css/swiper.css',
    { src: 'swiper/css/swiper.css', lang: 'css' },
    // '~/assets/css/style.css',
    '@/assets/css/common.scss',
    // 'highlight.js/styles/dracula.css',
    '@/assets/css/iconfont/iconfont.css',
    '@/assets/css/github-markdown.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '@/plugins/icon', ssr: false },
    // { src: '@/plugins/swiper.js', ssr: false },
    { src: '@/plugins/swiper', ssr: false },
    { src: '@/plugins/marked.js' },
    { src: '@/plugins/image-popup.js', ssr: false },
    { src: '@/plugins/gravatar.js' },
    { src: '@/plugins/highlight.js' },
    { src: '@/plugins/filters.js' },
    { src: '@/plugins/vConsole', ssr: false }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  dev: Object.is(process.env.NODE_ENV, 'production'),
  env: {
    baseUrl: apiConfig.baseUrl,
    host: 'http://wowmonkey.cn'
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    styleResources: {
      scss: [
        '@/assets/scss/index.scss'
      ]
    },
    extend(config, ctx) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [path.resolve(__dirname, 'assets/icons/svg')]

      // Includes /assets/icons/svg for svg-sprite-loader
      config.module.rules.push({
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'assets/icons/svg')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      })
    }
  }
}

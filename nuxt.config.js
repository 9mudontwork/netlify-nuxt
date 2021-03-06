const glob = require('glob')
const path = require('path')
const dynamicRoutes = getDynamicRoutes([
  {
    route: '/blog',
    jsonPath: 'assets/content/blog/*.json'
  }
])

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/redirect-module'
  ],
  redirect: [
    {
      from: '^.*(?<!/)$',
      to: (from, req) => req.url + '/'
    }
  ],
  generate: {
    // fallback: true,
    routes: dynamicRoutes
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

function getDynamicRoutes(pathLists) {
  let paths
  pathLists.forEach((route) => {
    paths = [].concat(
      route.route,
      glob
        .sync(route.jsonPath)
        .map((filepath) => `${route.route}/${path.basename(filepath, '.json')}`)
    )
  })

  return paths
}

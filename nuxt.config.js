import colors from 'vuetify/es5/util/colors';

export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'Raid Legacy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A passion replica of Dungeon Raid' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },
  css: ['~/assets/global.sass'],
  plugins: [
    '@/plugins/vue-konva.ts',
    '@/plugins/pwa-update.ts'
  ],
  googleAnalytics: {
    id: process.env.GA_ID,
    dev: !process.env.GA_ID
  },
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics',
    '@nuxtjs/composition-api/module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  pwa: {
    manifest: {
      name: 'Raid Legacy',
      short_name: 'Raid Legacy',
      description: 'A passion replica of Dungeon Raid'
    },
    meta: {
      name: 'Raid Legacy',
      description: 'A passion replica of Dungeon Raid'
    }
  },
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  build: {}
}

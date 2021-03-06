/**
 * Common Head
 */

const twitterId = '@21ch_tw'

module.exports = env => {
  return {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/ fb#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no,email=no,address=no' },

      // For Android Chrome: Tab Color
      { name: 'theme-color', content: '#FFFFFF' },
      // For Window8/10: Shortcut Icon
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      { name: 'msapplication-TileColor', content: '#FFFFFF' },
      { name: 'msapplication-TileImage', content: '/mstile-144×144.png' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' }, // summary, summary_large_image, app, player cards
      { name: 'twitter:site', content: twitterId },
      { name: 'twitter:creator', content: twitterId }
    ],
    link: [
      // Favicon
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      // Favicon: iPhone/iPad
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon-180x180.png'
      },
      // Favicon: Android Chrome
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192×192',
        href: '/android-chrome-192x192.png'
      },
      { rel: 'manifest', href: '/manifest.json' },

      // CSS
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c'
      }
    ]
  }
}

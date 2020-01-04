export default {
  methods: {
    headInfo() {
      return {}
    }
  },

  head() {
    const info = this.headInfo()

    const siteName = process.env.siteName
    const title = info.title ? `${info.title} | ${siteName}` : siteName
    const description = info.description || process.env.description
    const baseUrl = process.env.baseUrl
    const thisUrl = `${baseUrl}${this.$route.path}`
    const ogImageUrl = info.ogImagePath
      ? info.ogImagePath
      : `${baseUrl}/logo.png`

    return {
      title: title,
      htmlAttrs: {
        prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/ fb#'
      },
      meta: [
        { hid: 'description', name: 'description', content: description },
        { name: 'application-name', content: siteName },

        // OGP / Social Meta Tag
        {
          hid: 'og:type',
          property: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          name: 'og:description',
          content: description
        },
        { property: 'og:url', name: 'og:url', content: thisUrl },
        { property: 'og:image', name: 'og:image', content: ogImageUrl },
        { property: 'og:site_name', name: 'og:site_name', content: siteName }
      ],
      link: [{ rel: 'canonical', href: thisUrl }]
    }
  }
}

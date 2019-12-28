const fetchData = require('./fetch')
const { capitalize } = require('lodash')

class CosmicJsSource {
  static defaultOptions() {
    return {
      typeName: 'Cosmicjs',
      apiURL: 'https://api.cosmicjs.com/v1',
      bucketSlug: '',
      objectTypes: [],
      apiAccess: {},
    }
  }

  constructor(api, options) {
    this.options = options
    api.loadSource(args => this.fetchContent(args))
  }

  async fetchContent(store) {
    const { addCollection } = store
    const {
      typeName,
      apiURL,
      bucketSlug,
      objectTypes,
      apiAccess,
    } = this.options

    const promises = objectTypes.map(objectType =>
      fetchData({
        apiURL,
        bucketSlug,
        objectType,
        apiAccess,
      })
    )

    const data = await Promise.all(promises)

    objectTypes.forEach((objectType, i) => {
      const contentType = addCollection({
        typeName: `${typeName}${capitalize(objectType)}`,
      })
      var items = data[i]
      items.forEach((item, index) => {
        const custom_fields = {
          path: `/${objectType}/${item.slug}`,
          nextPath:
            index < items.length - 1
              ? `/${objectType}/${items[index + 1].slug}`
              : null,
          prevPath:
            index > 0 ? `/${objectType}/${items[index - 1].slug}` : null,
          nextTitle:
            index < items.length - 1 ? `${items[index + 1].title}` : null,
          prevTitle: index > 0 ? `${items[index - 1].title}` : null,
        }
        const node = {
          id: item._id,
          ...item,
          ...custom_fields,
        }
        contentType.addNode(node)
      })
    })
  }
}

module.exports = CosmicJsSource

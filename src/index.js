import fetchData from './fetch'
import { capitalize } from 'lodash';

class CosmicJsSource {
  static defaultOptions() {
    return {
        typeName: 'Cosmicjs',
        apiURL: 'https://api.cosmicjs.com/v1',
        bucketSlug:'',
        objectTypes: [],
        apiAccess: {},
    };
  }

  constructor(api, options) {
    this.options = options;
    api.loadSource(args => this.fetchContent(args));
  }

  async fetchContent(store) {
    const { addContentType } = store;
    const { typeName, apiURL, bucketSlug, objectTypes, apiAccess } = this.options;

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
      const contentType = addContentType({
        typeName: `${typeName}${capitalize(objectType)}`,
      });
      var items = data[i]
      items.forEach(item => {
        const node = this.createNode(item)
        contentType.addNode(node)
      })
    })
  }

  createNode(item) {
    const {
      _id: id,
      title,
      slug,
      content,
      created_at: date,
    } = item
    const node = {
      id,
      title,
      slug,
      content,
      date,
      fields: {
        ...item
      }
    }
    return node
  }
}

module.exports = CosmicJsSource;
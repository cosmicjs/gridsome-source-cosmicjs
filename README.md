# Gridsome Source for Cosmic JS

Source plugin for fetching data into [Gridsome](https://gridsome.org/) from [Cosmic JS](https://cosmicjs.com). Cosmic JS offers a [Headless CMS](https://cosmicjs.com/headless-cms) for your Gridsome website.

## Install

`npm install --save gridsome-source-cosmicjs`

## How to use

```javascript
// In your gridsome.config.js
plugins: [
  {
    use: 'gridsome-source-cosmicjs',
    options: {
      bucketSlug: 'gridsome-blog-cosmicjs',
      objectTypes: [`posts`],
      // If you have enabled read_key to fetch data (optional).
      apiAccess: {
        read_key: ''
      }
    },
  }
]
```

## How to query and filter

You can query the nodes created from Cosmic JS with the following:

```javascript
query IndexQuery {
  posts: allCosmicjsPosts {
    edges {
      node {
        id
        slug
        title
        createdAt(format: "DD MMMM, YYYY")
      }
    }
  }
}
```

and you can filter specific node using this:

```javascript
query postQuery($path: String!) {
  post: cosmicjsPosts(path: $path) {
    id
    content
    title
  }
}
```

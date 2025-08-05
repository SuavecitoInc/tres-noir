require("dotenv").config({
  path: `.env`,
})

const pagePath = `content`
const indexName =
  process.env.GATSBY_ENVIRONMENT === "production"
    ? `Products`
    : `staging_Products`

const excludedProductTypes = [
  "Insurance",
  "Lense Customization", // TODO: Remove this once the product type is fixed in Shopify
  "Lens Customization",
  "Lenses",
  "Upsell AO",
  "Case Add-Ons",
  "Safety Lens Customization",
]

const productsQuery = `{
  Shopify: allShopifyProduct {
    edges {
      node {
        internal {
          contentDigest
          type
          owner
        }
        handle
        id
        legacyResourceId
        title
        vendor
        metafields {
          key
          value
        }
        productType
        tags
        options {
          name
        }
        featuredImage {
          originalSrc
        }
        priceRangeV2 {
					minVariantPrice {
						amount
          }
          maxVariantPrice {
            amount
          }
        }
      }
    }
  }
  Contentful: allContentfulProduct {
    edges {
      node {
        internal {
          contentDigest
          type
          owner
        }
        handle
        styleDescription {
          styleDescription
        }
        variants {
          featuredImage {
            file {
              url
            }
            localFile {
              publicURL
            }
          }
        }
      }
    }
  }
  Yotpo: allYotpoProductBottomline {
    edges {
      node {
        internal {
          contentDigest
          type
          owner
        }
        id
        productIdentifier
        score
        totalReviews
      }
    }
  }
}
`

function products(data) {
  const arr = []
  data.Shopify.edges.forEach(({ node }) => {
    const handle = node.handle
    const legacyResourceId = node.legacyResourceId
    const contentful = data.Contentful.edges.find(({ node }) => {
      return node.handle === handle
    })
    const yotpo = data.Yotpo.edges.find(
      ({ node }) => node.productIdentifier === legacyResourceId
    )
    if (!excludedProductTypes.includes(node.productType)) {
      arr.push({
        node: {
          id: node.legacyResourceId,
          vendor: node.vendor,
          title: node.title,
          style_description: contentful
            ? contentful.node.styleDescription.styleDescription
            : "",
          option_names: node.options.map(el => el.name),
          min_variant_price: node.priceRangeV2.minVariantPrice.amount,
          max_variant_price: node.priceRangeV2.maxVariantPrice.amount,
          product_type: node.productType,
          tags: node.tags,
          product_image: contentful
            ? contentful.node.variants[0].featuredImage.localFile.publicURL
            : node.featuredImage
            ? node.featuredImage.originalSrc
            : "",
          handle: node.handle,
          price:
            node.priceRangeV2.minVariantPrice.amount ===
            node.priceRangeV2.maxVariantPrice.amount
              ? node.priceRangeV2.minVariantPrice.amount
              : "",
          yotpo: yotpo
            ? {
                score: yotpo.node.score,
                reviews: yotpo.node.totalReviews,
              }
            : null,
          internal: node.internal,
        },
      })
    }
  })
  return arr
}

function productToAlgoliaRecord({
  node: {
    id,
    vendor,
    title,
    style_description,
    option_names,
    price,
    min_variant_price,
    max_variant_price,
    product_type,
    tags,
    product_image,
    handle,
    yotpo,
    internal,
  },
}) {
  return {
    objectID: id,
    vendor: vendor,
    title: title,
    style_description: style_description,
    option_names: option_names,
    price: price,
    min_variant_price: min_variant_price,
    max_variant_price: max_variant_price,
    product_type: product_type,
    tags: tags,
    image: product_image,
    handle: handle,
    yotpo: yotpo,
    internal: internal,
  }
}

const queries = [
  {
    query: productsQuery,
    transformer: ({ data }) => {
      console.log(
        "Running Algolia query with environment:",
        process.env.GATSBY_ENVIRONMENT
      )
      console.log("Algolia index name:", indexName)
      const p = products(data)
      return p.map(productToAlgoliaRecord)
    },
    indexName,
    settings: { attributesToSnippet: [`style_description:20`] },
  },
]

module.exports = queries

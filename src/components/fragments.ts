import { graphql } from "gatsby"

export const shopifyProductsFields = graphql`
  fragment shopifyProductsFields on ShopifyProduct {
    handle
    description
    id
    legacyResourceId
    media {
      ... on ShopifyMediaImage {
        image {
          altText
          localFile {
            id
            childImageSharp {
              gatsbyImageData(quality: 50, width: 800, placeholder: BLURRED)
            }
          }
        }
      }
    }
    productType
    onlineStoreUrl
    vendor
    featuredImage {
      originalSrc
      altText
      localFile {
        id
        childImageSharp {
          gatsbyImageData(quality: 50, width: 800, placeholder: BLURRED)
        }
      }
    }
    title
    variants {
      compareAtPrice
      sku
      storefrontId
      legacyResourceId
      title
      image {
        originalSrc
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 50, width: 800, placeholder: BLURRED)
          }
        }
      }
      price
      product {
        legacyResourceId
        title
        description
        onlineStoreUrl
        productType
        collections {
          handle
          title
        }
        vendor
      }
      selectedOptions {
        name
        value
      }
    }
  }
`

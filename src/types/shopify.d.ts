import { IGatsbyImageData } from "gatsby-plugin-image"

export interface ShopifyProduct {
  handle: string
  featuredImage: {
    altText: string
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
    originalSrc: string
  }
  onlineStoreUrl: string
  priceRangeV2: {
    minVariantPrice: {
      amount: number
    }
    maxVariantPrice: {
      amount: number
    }
  }
  productType: string
  storefrontId: string
  title: string
  variants: {
    legacyResourceId: string
    title: string
    sku: string
    storefrontId: string
    compareAtPrice: string
    price: string
  }[]
  vendor: string
}

export interface ShopifyCollection {
  handle: string
  id: string
  title: string
  products: ShopifyProduct[]
  image: {
    altText: string
    originalSrc: string
  }
  description: string
}

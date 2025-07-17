import { IGatsbyImageData } from "gatsby-plugin-image"

export interface ContentfulProductVariant {
  id: string
  sku: string
  featuredImage: {
    localFile: {
      childImageSharp: {
        data: IGatsbyImageData
      }
    }
  }
  featuredImageClear: {
    localFile: {
      childImageSharp: {
        data: IGatsbyImageData
      }
    }
  }
  colorName: string
  colorImage: {
    localFile: {
      childImageSharp: {
        data: IGatsbyImageData
      }
    }
  }
  frameColor: string[]
  dominantFrameColor: string
  lensColor: string
  product: {
    handle: string
    title: string
    frameWidth: string[]
  }[]
}

export interface ContentfulProduct {
  handle: string
  id: string
  title: string
  frameWidth: string[]
  collection: {
    name: string
    handle: string
  }[]
  variants: ContentfulProductVariant[]
}

export interface ContentfulCollection {
  handle: string
  name: string
  description: string
  showOverlay: boolean
  featuredImage: {
    localFile: {
      childImageSharp: {
        data: IGatsbyImageData
      }
      publicURL: string
    }
    description: string
    // url: string
  }
  featuredImage2: {
    localFile: {
      childImageSharp: {
        data: IGatsbyImageData
      }
    }
  }
  featuredImageTextColor: string
  featuredImageTextPosition: string
  featuredImageTextPositionY: string
  featuredImageClear: {
    localFile: {
      childImageSharp: {
        data: IGatsbyImageData
      }
    }
  }
  products: ContentfulProduct[]
}

export interface ContentfulVariantCollection {
  description: string
  handle: string
  id: string
  image: {
    localFile: {
      childImageSharp: {
        data: IGatsbyImageData
      }
    }
  }
  title: string
  variants: ContentfulProductVariant[]
  sku: string
}

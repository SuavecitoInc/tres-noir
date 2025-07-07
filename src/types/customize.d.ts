import { IGatsbyImageData } from "gatsby-plugin-image"

export interface ContentfulProduct {
  handle: string
  fitDimensions: string
  frameWidthMeasurement: number
  variants: ContentfulProductVariant[]
  casesAvailable: string[]
}

export interface ContentfulProductVariant {
  colorName: string
  sku: string
  colorImage: {
    data: IGatsbyImageData
    title: string
  }
  customizations: {
    bifocal: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    bifocalGradientTintSmokeLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    bifocalGradientTintBrownLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    bifocalGradientTintG15Lenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    clear: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    gradientTintSmokeLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    gradientTintBrownLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    gradientTintG15Lenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesSmokeLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesBrownLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesGreenLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesOrangeLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesYellowLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesBlueLenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesG15Lenses: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesSmokeLensesBifocal: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesBrownLensesBifocal: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesGreenLensesBifocal: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesOrangeLensesBifocal: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesYellowLensesBifocal: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesBlueLensesBifocal: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
    sunGlassesG15LensesBifocal: {
      localFile: {
        childImageSharp: {
          data: IGatsbyImageData
        }
      }
      title: string
    }
  }
}

export interface ShopifyProduct {
  collections: { title: string }[]
  featuredImage: {
    originalSrc: string
  }
  id: string
  handle: string
  legacyResourceId: string
  onlineStoreUrl: string
  priceRangeV2: {
    minVariantPrice: string
    maxVariantPrice: string
  }
  productType: string
  title: string
  variants: ShopifyProductVariant[]
  vendor: string
}

export interface ShopifyProductVariant {
  availableForSale: boolean
  compareAtPrice: number | null
  id: string
  legacyResourceId: string
  price: number
  product: {
    collections: {
      handle: string
      title: string
    }[]
    handle: string
    onlineStoreUrl: string
    productType: string
    vendor: string
    title: string
  }
  sku: string
  storefrontId: string
  title: string
  image: {
    originalSrc: string
  }
}

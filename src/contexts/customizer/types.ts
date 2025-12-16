// TODO: create types for availablePaths and pathOptions
export type Variant = {
  compareAtPrice: number | null
  image: {
    originalSrc: string
    altText: string
    localFile: {
      childImageSharp: {
        gatsbyImageData: any
      }
    }
  }
  legacyResourceId: string
  price: number
  product: {
    collections: {
      handle: string
      title: string
    }[]
    description: string
    legacyResourceId: string
    onlineStoreUrl: string
    productType: string
    title: string
    vendor: string
  }
  selectedOptions: {
    name: string
    value: string
  }[]
  storefrontId: string
  sku: string
  title: string
}

export type Product = {
  id: string
  handle: string
  description: string
  image: {
    originalSrc: string
    altText: string
    localFile: {
      id: string
      childImageSharp: {
        gatsbyImageData: any
      }
    }
  }
  media: {
    image: {
      originalSrc: string | null
      altText: string | null
      localFile: {
        id: string
        childImageSharp: {
          gatsbyImageData: any
        }
      }
    }
  }[]
  legacyResourceId: string
  onlineStoreUrl: string
  productType: string
  title: string
  vendor: string
  variants: Variant[]
}

export type AvailablePath = {
  title: string
  description: string
  image: {
    originalSrc: string
    altText: string
    localFile: {
      id: string
      childImageSharp: {
        gatsbyImageData: any
      }
    }
  }
  products: Product[]
}

export type SelectedVariants = {
  step1: any
  step2: any
  case: any
}

export type GlassesType = "Glasses" | "Safety Glasses"

export type CustomizerContextType = {
  type: GlassesType
  setType: (type: GlassesType) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  productUrl: string
  setProductUrl: (url: string) => void
  selectedCollectionPath: AvailablePath
  setSelectedCollectionPath: (path: AvailablePath) => void
  availablePaths: AvailablePath[]
  selectedVariants: SelectedVariants
  setSelectedVariants: (selectedVariants: SelectedVariants) => void
  setSelectedVariantsToDefault: () => void
  hasSavedCustomized: {
    step1: boolean
    step2: boolean
    case: boolean
  }
  setHasSavedCustomized: (hasSavedCustomized: {
    step1: boolean
    step2: boolean
    case: boolean
  }) => void
}

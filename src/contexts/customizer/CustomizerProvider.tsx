import React, { useEffect, useMemo, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import CustomizerContext from "./context"
import type { AvailablePath, GlassesType } from "./types"

type Props = {
  children: React.ReactNode
}

const DEFAULT_STEPS = {
  step1: {
    image: {
      originalSrc: "",
      altText: "",
      localFile: {
        childImageSharp: {
          gatsbyImageData: {},
        },
      },
    },
    legacyResourceId: "",
    price: 0,
    compareAtPrice: null,
    product: {
      title: "",
      description: "",
      onlineStoreUrl: "",
      productType: "",
      collections: {
        handle: "",
        title: "",
      },
      vendor: "",
    },
    selectedOptions: [
      {
        name: "",
        value: "",
      },
    ],
    storefrontId: "",
    sku: "",
    title: "",
  },
  step2: {
    image: {
      originalSrc: "",
      altText: "",
      localFile: {
        childImageSharp: {
          gatsbyImageData: {},
        },
      },
    },
    legacyResourceId: "",
    price: 0,
    compareAtPrice: null,
    product: {
      title: "",
      description: "",
      onlineStoreUrl: "",
      productType: "",
      collections: {
        handle: "",
        title: "",
      },
      vendor: "",
    },
    selectedOptions: [
      {
        name: "",
        value: "",
      },
    ],
    storefrontId: "",
    sku: "",
    title: "",
  },
  case: {
    image: {
      originalSrc: "",
      altText: "",
      localFile: {
        childImageSharp: {
          gatsbyImageData: {},
        },
      },
    },
    legacyResourceId: "",
    compareAtPrice: null,
    price: 0,
    product: {
      title: "",
      description: "",
      onlineStoreUrl: "",
      productType: "",
      collections: {
        handle: "",
        title: "",
      },
      vendor: "",
    },
    selectedOptions: [
      {
        name: "",
        value: "",
      },
    ],
    storefrontId: "",
    sku: "",
    title: "",
  },
}

export function CustomizerProvider({ children }: Props) {
  // get collections and collection featured images

  const { nonPrescription, singleVision, readers, bifocal, progressive } =
    useStaticQuery(graphql`
      query CustomizerQuery {
        nonPrescription: shopifyCollection(handle: { eq: "non-prescription" }) {
          title
          description
          image {
            originalSrc
            altText
            localFile {
              id
              childImageSharp {
                gatsbyImageData(quality: 50)
              }
            }
          }
          products {
            ...shopifyProductsFields
          }
        }
        singleVision: shopifyCollection(handle: { eq: "single-vision" }) {
          title
          description
          image {
            originalSrc
            altText
            localFile {
              id
              childImageSharp {
                gatsbyImageData(quality: 50)
              }
            }
          }
          products {
            ...shopifyProductsFields
          }
        }
        readers: shopifyCollection(handle: { eq: "readers" }) {
          title
          description
          image {
            originalSrc
            altText
            localFile {
              id
              childImageSharp {
                gatsbyImageData(quality: 50)
              }
            }
          }
          products {
            ...shopifyProductsFields
          }
        }
        bifocal: shopifyCollection(handle: { eq: "bifocal" }) {
          title
          description
          image {
            originalSrc
            altText
            localFile {
              id
              childImageSharp {
                gatsbyImageData(quality: 50)
              }
            }
          }
          products {
            ...shopifyProductsFields
          }
        }
        progressive: shopifyCollection(handle: { eq: "progressive" }) {
          title
          description
          image {
            originalSrc
            altText
            localFile {
              id
              childImageSharp {
                gatsbyImageData(quality: 50)
              }
            }
          }
          products {
            ...shopifyProductsFields
          }
        }
      }
    `)

  const CONFIG = {
    Glasses: {
      availablePaths: [
        nonPrescription,
        singleVision,
        readers,
        bifocal,
        progressive,
      ],
    },
    "Safety Glasses": {
      availablePaths: [singleVision, progressive],
    },
  }

  const [type, setType] = useState<GlassesType>("Glasses")

  const [availablePaths, setAvailablePaths] = useState<AvailablePath[]>(
    CONFIG["Glasses"].availablePaths
  )
  const [selectedCollectionPath, setSelectedCollectionPath] =
    useState<AvailablePath>(nonPrescription)

  const [currentStep, setCurrentStep] = useState(0)
  const [productUrl, setProductUrl] = useState("")

  const [selectedVariants, setSelectedVariants] = useState(DEFAULT_STEPS)

  const [hasSavedCustomized, setHasSavedCustomized] = useState({
    step1: false,
    step2: false,
    case: false,
  })

  const setSelectedVariantsToDefault = () => {
    setSelectedVariants(DEFAULT_STEPS)
  }

  useEffect(() => {
    // change selected variants when the selected collection path changes, but keep the existing case selection
    setSelectedVariants(selectedVariants => ({
      ...DEFAULT_STEPS,
      case: selectedVariants.case,
    }))
  }, [selectedCollectionPath])

  useEffect(() => {
    if (type) {
      // reset selected collection path when type changes
      setAvailablePaths(CONFIG[type].availablePaths)
      setSelectedCollectionPath(CONFIG[type].availablePaths[0] as AvailablePath)
    }
  }, [type])

  // const availablePaths = CONFIG[type].availablePaths

  const value = useMemo(
    () => ({
      type,
      setType,
      currentStep,
      setCurrentStep,
      productUrl,
      setProductUrl,
      selectedCollectionPath,
      setSelectedCollectionPath,
      availablePaths,
      selectedVariants,
      setSelectedVariants,
      setSelectedVariantsToDefault,
      hasSavedCustomized,
      setHasSavedCustomized,
    }),
    [
      type,
      setType,
      currentStep,
      setCurrentStep,
      productUrl,
      setProductUrl,
      selectedCollectionPath,
      setSelectedCollectionPath,
      availablePaths,
      selectedVariants,
      setSelectedVariants,
      hasSavedCustomized,
      setHasSavedCustomized,
    ]
  )

  return (
    <CustomizerContext.Provider value={value}>
      {children}
    </CustomizerContext.Provider>
  )
}

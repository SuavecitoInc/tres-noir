import React, { createContext, useState, useMemo, useEffect } from "react"
import {
  SelectedVariants,
  ShopifyVariant,
  SavedCustomizeSafetyContexts,
  SelectedVariantStorage,
  SafetyGlassesSelectedVariants,
} from "../types/global"

const defaultSelectedVariants = {
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

const defaultVariant = {
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
}

const defaultContext = {
  currentStep: 1,
  setCurrentStep: (currentStep: number) => {},
  productUrl: "/",
  setProductUrl: (productUrl: string) => {},
  selectedVariants: defaultSelectedVariants,
  setSelectedVariants: (selectedVariants: SafetyGlassesSelectedVariants) => {},
  setSelectedVariantsToDefault: () => {},
  hasSavedCustomized: {
    step1: false,
    case: false,
  },
  setHasSavedCustomized: (
    hasSavedCustomized: SavedCustomizeSafetyContexts
  ) => {},
  defaultVariant: defaultVariant,
}

export const CustomizeContext = createContext(defaultContext)

export const CustomizeSafetyGlassesProvider = ({
  children,
}: {
  children: any
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [productUrl, setProductUrl] = useState("")
  const [hasSavedCustomized, setHasSavedCustomized] = useState({
    step1: false,
    case: false,
  })

  const [selectedVariants, setSelectedVariants] =
    useState<SafetyGlassesSelectedVariants>(defaultSelectedVariants)

  const setSelectedVariantsToDefault = () => {
    setSelectedVariants(defaultSelectedVariants)
  }

  const value = useMemo(
    () => ({
      currentStep,
      setCurrentStep,
      productUrl,
      setProductUrl,
      selectedVariants,
      setSelectedVariants,
      setSelectedVariantsToDefault,
      hasSavedCustomized,
      setHasSavedCustomized,
      defaultVariant,
    }),
    [
      currentStep,
      setCurrentStep,
      productUrl,
      setProductUrl,
      selectedVariants,
      setSelectedVariants,
      hasSavedCustomized,
      setHasSavedCustomized,
      defaultVariant,
    ]
  )

  return (
    <CustomizeContext.Provider value={value}>
      {children}
    </CustomizeContext.Provider>
  )
}

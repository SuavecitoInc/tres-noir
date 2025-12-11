import React, { useEffect, useMemo, useState } from "react"
import CustomizerContext from "./context"
import type { AvailablePath, GlassesType } from "./types"
import useCustomizerCollections from "../../hooks/useCustomizerCollections"

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
    useCustomizerCollections()

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
    CONFIG["Glasses"]?.availablePaths || []
  )

  console.log("availablePaths", availablePaths)
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
      // if (CONFIG[type].availablePaths.length > 0)
      //   setSelectedCollectionPath(
      //     CONFIG[type].availablePaths[0] as AvailablePath
      //   )
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

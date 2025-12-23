import React, { useCallback, useEffect, useMemo, useState } from "react"
import CustomizerContext from "./context"
import type { AvailablePath, GlassesType } from "./types"
import useCustomizerCollections from "../../hooks/useCustomizerCollections"
import { useLocation } from "react-use"
import { get } from "js-cookie"

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

const isBrowser: boolean = typeof window !== "undefined"

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

  const getInitialMode = (): boolean => {
    if (isBrowser) {
      const urlParams = new URLSearchParams(window.location.search)
      const custom_id = urlParams.get("custom_id")
      if (custom_id) {
        return true
      }
    }
    return false
  }

  const [editMode, setEditMode] = useState(getInitialMode())
  const [type, setType] = useState<GlassesType>("Glasses")

  const [availablePaths, setAvailablePaths] = useState<AvailablePath[]>(
    CONFIG["Glasses"]?.availablePaths || []
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

  const setSelectedVariantsToDefault = useCallback(() => {
    setSelectedVariants(DEFAULT_STEPS)
  }, [])

  const setEditData = useCallback(
    (
      variants: typeof DEFAULT_STEPS,
      glassesType: GlassesType,
      pathName: string
    ) => {
      setEditMode(true)
      setSelectedVariants(variants)
      setType(glassesType)
      const pathSelected = CONFIG[glassesType].availablePaths.find(
        path => path.title === pathName
      )
      if (pathSelected) {
        setAvailablePaths(CONFIG[glassesType].availablePaths)
        setSelectedCollectionPath(pathSelected)
      }
      setHasSavedCustomized({ step1: true, step2: true, case: true })
      setCurrentStep(3)
    },
    [CONFIG]
  )
  useEffect(() => {
    if (type && !editMode) {
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
      setEditData,
      setEditMode,
    }),
    [
      type,
      currentStep,
      productUrl,
      selectedCollectionPath,
      availablePaths,
      selectedVariants,
      hasSavedCustomized,
    ]
  )

  return (
    <CustomizerContext.Provider value={value}>
      {children}
    </CustomizerContext.Provider>
  )
}

import { createContext } from "react"
import type {
  CustomizerContextType,
  AvailablePath,
  SelectedVariants,
  GlassesType,
} from "./types"

const defaultContext: CustomizerContextType = {
  type: "Glasses",
  setType: (type: GlassesType) => {},
  currentStep: 1,
  setCurrentStep: (step: number) => {},
  productUrl: "",
  setProductUrl: (url: string) => {},
  selectedCollectionPath: {} as AvailablePath,
  setSelectedCollectionPath: (path: AvailablePath) => {},
  availablePaths: [],
  selectedVariants: {} as any,
  setSelectedVariants: (selectedVariants: SelectedVariants) => {},
  setSelectedVariantsToDefault: () => {},
  hasSavedCustomized: {
    step1: false,
    step2: false,
    case: false,
  },
  setHasSavedCustomized: (hasSavedCustomized: {
    step1: boolean
    // step2: boolean
    case: boolean
  }) => {},
  setEditData: () => {},
  setEditMode: (editMode: boolean) => {},
}

export const CustomizerContext = createContext(defaultContext)

export default CustomizerContext

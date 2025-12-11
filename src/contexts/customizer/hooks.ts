import { useContext } from "react"

import { CustomizerContext } from "./context"

export const useCustomizer = () => useContext(CustomizerContext)

export default useCustomizer

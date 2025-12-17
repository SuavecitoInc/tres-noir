import { useContext } from "react"

import { RxInfoContext } from "./context"

export const useRxInfo = () => useContext(RxInfoContext)

export default useRxInfo

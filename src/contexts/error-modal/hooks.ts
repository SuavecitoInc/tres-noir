import { useContext } from "react"

import { ErrorModalContext } from "./context"

export const useErrorModal = () => useContext(ErrorModalContext)

export default useErrorModal

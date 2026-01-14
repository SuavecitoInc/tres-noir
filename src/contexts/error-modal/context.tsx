import { createContext } from "react"
import type { DefaultContext } from "./types"

const defaultContext: DefaultContext = {
  errorModalIsOpen: false,
  renderErrorModal: () => {},
  closeErrorModal: () => {},
  onAfterOpen: cb => cb,
  onAfterClose: cb => cb,
  errorMsg: "",
}

export const ErrorModalContext = createContext(defaultContext)

export default ErrorModalContext

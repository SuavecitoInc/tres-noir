import { createContext } from "react"
import type { DefaultContext } from "./types"

const defaultContext: DefaultContext = {
  isLoading: false,
  error: null,
  setError: () => {},
  ordersData: [],
  customerData: null,
}

export const CustomerContext = createContext(defaultContext)

export default CustomerContext

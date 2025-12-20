import { createContext } from "react"
import type { DefaultContext } from "./types"

const defaultContext: DefaultContext = {
  isLoading: false,
  setIsLoading: () => {},
  loadData: async () => {},
  error: null,
  setError: () => {},
  ordersData: [],
  setOrdersData: () => {},
  customerData: null,
  setCustomerData: () => {},
}

export const CustomerContext = createContext(defaultContext)

export default CustomerContext

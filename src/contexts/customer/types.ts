import { CustomerInfo } from "../../types/customer"
import { Order } from "../../types/customer-orders"

export type CustomerData = {
  data: {
    customer: CustomerInfo
    accessToken: string
  }
}

export interface DefaultContext {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  loadData: () => Promise<void>
  error: string | null
  setError: (error: string | null) => void
  ordersData: { node: Order }[] | null
  setOrdersData: (orders: { node: Order }[] | null) => void
  customerData: CustomerData | null
  setCustomerData: (data: CustomerData | null) => void
}

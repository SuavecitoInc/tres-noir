import { CustomerInfo } from "../../types/customer"
import { Order } from "../../types/customer-orders"

export interface DefaultContext {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  loadData: () => Promise<void>
  error: string | null
  setError: (error: string | null) => void
  ordersData: { node: Order }[] | null
  setOrdersData: (orders: { node: Order }[] | null) => void
  customerData: CustomerInfo | null
  setCustomerData: (data: CustomerInfo | null) => void
}

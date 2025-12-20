import { CustomerInfo } from "../../types/customer"
import { Order } from "../../types/customer-orders"

export interface DefaultContext {
  isLoading: boolean
  error: string | null
  setError: (error: string | null) => void
  ordersData: { node: Order }[]
  customerData: CustomerInfo | null
}

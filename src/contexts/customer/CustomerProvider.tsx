import React, {
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react"
import { navigate } from "gatsby"
import CustomerContext from "./context"
import { useCustomerAuth } from "../../hooks/useCustomerAuth"
import {
  getCustomerInfo,
  getCustomerOrders,
} from "../../api/customerAccountClient"
import type { CustomerInfo } from "../../types/customer"
import type { Order } from "../../types/customer-orders"

const DEBUG = false

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const {
    isAuthenticated,
    accessToken,
    login,
    logout,
    clear,
    isLoading: isLoadingAuth,
  } = useCustomerAuth()

  DEBUG && console.log("CustomerProvider isAuthenticated:", isAuthenticated)
  DEBUG && console.log("CustomerProvider accessToken:", accessToken)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [customerData, setCustomerData] = useState<CustomerInfo | null>(null)
  const [ordersData, setOrdersData] = useState<{ node: Order }[] | null>(null)

  const loadData = useCallback(async () => {
    try {
      DEBUG && console.log("CustomerProvider loadData called")
      DEBUG && console.log("isAuthenticated:", isAuthenticated)
      DEBUG && console.log("accessToken:", accessToken)
      if (isAuthenticated && accessToken) {
        setIsLoading(true)
        const customerInfo = await getCustomerInfo(accessToken)

        setCustomerData(customerInfo)

        const ordersResponse = await getCustomerOrders(accessToken)
        if (ordersResponse?.data?.customer?.orders?.edges) {
          const orders = ordersResponse.data.customer.orders.edges
          DEBUG && console.log("Fetched orders:", orders)
          setOrdersData(orders)
          setIsLoading(false)
        }
      } else if (!isAuthenticated && isLoadingAuth) {
        console.log(
          "Loading ...User not authenticated, redirecting to /account",
          isAuthenticated
        )
      } else {
        console.log("User not authenticated, redirecting to /account")
        navigate("/account")
      }
    } catch (error) {
      console.error("Error loading data:", error)
      clear()
    }
  }, [isAuthenticated, accessToken, isLoadingAuth])

  useEffect(() => {
    if (!isAuthenticated && !accessToken) return
    if (!customerData || !ordersData) {
      DEBUG && console.log("Customer data missing, loading data")
      loadData()
    }
  }, [loadData, isAuthenticated, accessToken, customerData, ordersData])

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      loadData,
      error,
      setError,
      ordersData,
      setOrdersData,
      customerData,
      setCustomerData,
    }),
    [
      isLoading,
      setIsLoading,
      loadData,
      error,
      setError,
      ordersData,
      customerData,
      setOrdersData,
      setCustomerData,
      isAuthenticated,
      isLoadingAuth,
      accessToken,
    ]
  )

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  )
}

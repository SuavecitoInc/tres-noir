import React, { useCallback, useEffect, useState } from "react"
import { navigate } from "gatsby"

import { useCustomerAuth } from "../../../hooks/useCustomerAuth"
import { getCustomerOrder } from "../../../api/customerAccountClient"

import Layout from "../../../components/layout"
import Order from "../../../components/account/order"
import Loader from "../../../components/loader"
import type { Order as OrderType } from "../../../types/customer-orders"
import { ENABLE_NEW_CUSTOMER_ACCOUNTS } from "../../../flags"

const DEBUG = false

const getGlobalIDFromLegacyID = (legacyId: string) => {
  return `gid://shopify/Order/${legacyId}`
}

const OrderPage = ({ location }) => {
  DEBUG && console.log("OrderPage location:", location)
  const params = new URLSearchParams(location.search)
  DEBUG && console.log("OrderPage params:", params)

  const orderId = params.get("id")

  const { isAuthenticated, accessToken, clear, isLoading } = useCustomerAuth()
  const [loadingOrder, setLoadingOrder] = useState(true)
  const [orderData, setOrderData] = useState<OrderType>()

  const loadData = useCallback(async () => {
    try {
      if (isAuthenticated && accessToken && orderId) {
        const globalOrderId = getGlobalIDFromLegacyID(orderId)
        DEBUG && console.log("Fetching order with global ID:", globalOrderId)
        const orderResponse = await getCustomerOrder(accessToken, globalOrderId)
        DEBUG && console.log("Customer orders fetched:", orderResponse.data)
        if (orderResponse?.data?.order) {
          const order = orderResponse.data.order
          DEBUG && console.log("Parsed order:", order)
          setOrderData(order)
          setLoadingOrder(false)
        }
      } else if (!isAuthenticated && isLoading) {
        console.log(
          "Loading ...User not authenticated, redirecting to /account",
          isAuthenticated
        )
      } else {
        DEBUG && console.log("User not authenticated, redirecting to /account")
        navigate("/account")
      }
    } catch (error) {
      console.error("Error loading data:", error)
      clear()
    }
  }, [isAuthenticated, accessToken])

  useEffect(() => {
    if (!ENABLE_NEW_CUSTOMER_ACCOUNTS) {
      window.location.href = "https://account.tresnoir.com/account/"
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (!ENABLE_NEW_CUSTOMER_ACCOUNTS || isLoading || loadingOrder) {
    return (
      <Layout>
        <Loader />
      </Layout>
    )
  }

  return (
    <Layout>
      <div>
        {/* Display customer data */}
        <Order orderData={orderData!} />
      </div>
    </Layout>
  )
}

export default OrderPage

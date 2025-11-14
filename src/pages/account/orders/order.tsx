import React, { useCallback, useEffect, useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"

import { useCustomerAuth } from "../../../hooks/useCustomerAuth"
import { getCustomerOrder } from "../../../api/customerAccountClient"

import Layout from "../../../components/layout"
import Order from "../../../components/account/order"
import type { Order as OrderType } from "../../../types/customer-orders"

const getGlobalIDFromLegacyID = (legacyId: string) => {
  return `gid://shopify/Order/${legacyId}`
}

const OrderPage = ({ location }) => {
  console.log("OrderPage location:", location)
  const params = new URLSearchParams(location.search)
  console.log("OrderPage params:", params)

  const orderId = params.get("id")

  const { isAuthenticated, accessToken, clear, isLoading } = useCustomerAuth()
  const [loadingOrder, setLoadingOrder] = useState(true)
  const [orderData, setOrderData] = useState<OrderType>()

  const loadData = useCallback(async () => {
    try {
      if (isAuthenticated && accessToken && orderId) {
        const globalOrderId = getGlobalIDFromLegacyID(orderId)
        console.log("Fetching order with global ID:", globalOrderId)
        const orderResponse = await getCustomerOrder(accessToken, globalOrderId)
        console.log("Customer orders fetched:", orderResponse.data)
        if (orderResponse?.data?.order) {
          const order = orderResponse.data.order
          console.log("Parsed order:", order)
          setOrderData(order)
          setLoadingOrder(false)
        }
      } else if (!isAuthenticated && isLoading) {
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
  }, [isAuthenticated, accessToken])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (isLoading || loadingOrder) {
    return (
      <Layout>
        <div>Loading...</div>
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

import React, { useCallback, useEffect, useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"

import { useCustomerAuth } from "../../../hooks/useCustomerAuth"
import {
  getCustomerInfo,
  getCustomerOrders,
} from "../../../api/customerAccountClient"

import Layout from "../../../components/layout"
import Orders from "../../../components/account/orders"
import Loader from "../../../components/loader"

const Page = styled.div`
  .logout-button {
    margin-bottom: 20px;
    background: none;
    border: none;
    cursor: pointer;
    color: #000;
  }
  .logout-button:hover {
    text-decoration: underline;
  }
`

const OrdersPage = ({ location }) => {
  const params = new URLSearchParams(location.search)
  const loggedOut = params.get("logged_out") === "true"
  const { isAuthenticated, accessToken, login, logout, clear, isLoading } =
    useCustomerAuth()
  const [customerData, setCustomerData] = useState(null)
  const [ordersData, setOrdersData] = useState([])

  const loadData = useCallback(async () => {
    try {
      if (isAuthenticated && accessToken) {
        const customerInfo = await getCustomerInfo(accessToken)

        setCustomerData(customerInfo)

        const ordersResponse = await getCustomerOrders(accessToken)
        if (ordersResponse?.data?.customer?.orders?.edges) {
          const orders = ordersResponse.data.customer.orders.edges
          console.log("Parsed orders:", orders)
          setOrdersData(orders)
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
    if (loggedOut) {
      console.log("User logged out, clearing session")
      clear()
    }
  }, [loggedOut])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <Page>
          {/* @ts-expect-error - Display customer information */}
          <h3>Welcome, {customerData?.data?.customer?.firstName}</h3>
          <button type="button" onClick={logout} className="logout-button">
            Logout
          </button>
          {/* Display customer data */}
          <Orders orders={ordersData} />
        </Page>
      )}
    </Layout>
  )
}

export default OrdersPage

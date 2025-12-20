import React, { useEffect } from "react"
import styled from "styled-components"

import { useCustomerAuth } from "../../../hooks/useCustomerAuth"

import Layout from "../../../components/layout"
import Orders from "../../../components/account/orders"
import Loader from "../../../components/loader"

import { useCustomer } from "../../../contexts/customer"

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
  const { logout, clear, isLoading: isLoadingAuth } = useCustomerAuth()

  const { ordersData, customerData, isLoading: isLoadingData } = useCustomer()

  useEffect(() => {
    if (loggedOut) {
      console.log("User logged out, clearing session")
      clear()
    }
  }, [loggedOut])

  return (
    <Layout>
      {isLoadingAuth || isLoadingData ? (
        <Loader />
      ) : (
        <Page>
          {/* @ts-expect-error - Display customer information */}
          <h3>Welcome, {customerData?.data?.customer?.firstName}</h3>
          <button type="button" onClick={logout} className="logout-button">
            Logout
          </button>
          {/* Display customer data */}
          {isLoadingData ? <Loader /> : <Orders orders={ordersData} />}
        </Page>
      )}
    </Layout>
  )
}

export default OrdersPage

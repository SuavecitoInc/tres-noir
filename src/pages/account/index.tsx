import React, { useEffect, useState } from "react"
import { useCustomerAuth } from "../../hooks/useCustomerAuth"
import {
  getCustomerInfo,
  getCustomerOrders,
} from "../../api/customerAccountClient"

import Layout from "../../components/layout"
import Orders from "../../components/account/orders"

const AccountPage = () => {
  const { isAuthenticated, accessToken, login, logout, clear, isLoading } =
    useCustomerAuth()
  const [customerData, setCustomerData] = useState(null)
  const [ordersData, setOrdersData] = useState([])

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      getCustomerInfo(accessToken)
        .then(data => {
          console.log("Customer info fetched:", data)
          // setCustomerData(data)
          window.location.href =
            process.env.GATSBY_CUSTOMER_ACCOUNTS_SHOPIFY_URL!
        })
        .catch(error => {
          console.error("Error fetching customer info:", error)
          clear()
        })
      // disabled for now, as I think we will just have this page be a login and loading page that redirects to shopify account page
      // getCustomerOrders(accessToken)
      //   .then(response => {
      //     console.log("Customer orders fetched:", response.data)
      //     if (response?.data?.customer?.orders?.edges) {
      //       const orders = response.data.customer.orders.edges
      //       console.log("Parsed orders:", orders)
      //       setOrdersData(orders)
      //     }
      //   })
      //   .catch(error => {
      //     console.error("Error fetching customer orders:", error)
      //     clear()
      //   })
    }
  }, [isAuthenticated, accessToken])

  if (isLoading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div>
          <h1>Login Required</h1>
          <button onClick={login}>Login with Shopify</button>
        </div>
      </Layout>
    )
  }

  // return (
  //   <Layout>
  //     <div>
  //       {/* @ts-expect-error - Display customer information */}
  //       <h1>Welcome, {customerData?.data?.customer?.firstName}</h1>
  //       <button onClick={logout}>Logout</button>
  //       {/* Display customer data */}
  //       <Orders orders={ordersData} />
  //     </div>
  //   </Layout>
  // )

  return (
    <Layout>
      <div>Loading...</div>
    </Layout>
  )
}

export default AccountPage

import React, { useCallback, useEffect } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"

import { useCustomerAuth } from "../../hooks/useCustomerAuth"
import {
  getCustomerInfo,
  getCustomerOrders,
} from "../../api/customerAccountClient"
import { useCustomer } from "../../contexts/customer"
import Layout from "../../components/layout"
import Loader from "../../components/loader"
import {
  ENABLE_NEW_CUSTOMER_ACCOUNTS,
  FORWARD_TO_NEW_CUSTOMER_ACCOUNTS,
} from "../../flags"

const DEBUG = false

const LoginView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  .content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .login-button {
    font-family: var(--heading-font);
    background-color: #000;
    border-radius: 0;
    border: 1px solid #000;
    color: #fff;
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    cursor: pointer;
    @media only screen and (max-width: 468px) {
      margin-bottom: 1.75rem;
    }
  }
`

const AccountPage = () => {
  const {
    isAuthenticated,
    accessToken,
    login,
    clear,
    isLoading: isLoadingAuth,
  } = useCustomerAuth()

  const {
    setCustomerData,
    setOrdersData,
    isLoading: isLoadingData,
    setIsLoading: setIsLoadingData,
  } = useCustomer()

  const loadData = useCallback(async () => {
    try {
      if (isAuthenticated && accessToken) {
        const customerInfo = await getCustomerInfo(accessToken)

        setCustomerData(customerInfo)

        const ordersResponse = await getCustomerOrders(accessToken)
        if (ordersResponse?.data?.customer?.orders?.edges) {
          const orders = ordersResponse.data.customer.orders.edges
          DEBUG && console.log("Fetched orders:", orders)
          setOrdersData(orders)
          setIsLoadingData(false)
        }

        if (!FORWARD_TO_NEW_CUSTOMER_ACCOUNTS) {
          navigate("/account/orders")
        } else {
          window.location.href =
            process.env.GATSBY_CUSTOMER_ACCOUNTS_SHOPIFY_URL!
        }
      }
    } catch (error) {
      console.error("Error loading data:", error)
      setIsLoadingData(false)
      clear()
    }
  }, [isAuthenticated, accessToken])

  useEffect(() => {
    if (!ENABLE_NEW_CUSTOMER_ACCOUNTS) {
      window.location.href = "https://account.tresnoir.com/account"
    }
  }, [])

  useEffect(() => {
    if (!ENABLE_NEW_CUSTOMER_ACCOUNTS) return
    loadData()
  }, [loadData])

  if (!ENABLE_NEW_CUSTOMER_ACCOUNTS || isLoadingAuth || isLoadingData) {
    return (
      <Layout>
        <Loader />
      </Layout>
    )
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <LoginView>
          <div className="content">
            <h1>Account</h1>
            <button className="login-button" onClick={login}>
              Login with Shopify
            </button>
          </div>
        </LoginView>
      </Layout>
    )
  }
}

export default AccountPage

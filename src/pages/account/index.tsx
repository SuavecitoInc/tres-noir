import React, { useCallback, useEffect } from "react"
import styled from "styled-components"

import { useCustomerAuth } from "../../hooks/useCustomerAuth"
import { getCustomerInfo } from "../../api/customerAccountClient"

import Layout from "../../components/layout"
import Loader from "../../components/loader"
import { navigate } from "gatsby"

// TODO: move to config
const REDIRECT_TO_SHOPIFY_ACCOUNT = false

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
  }
`

const AccountPage = () => {
  const { isAuthenticated, accessToken, login, logout, clear, isLoading } =
    useCustomerAuth()

  const loadData = useCallback(async () => {
    try {
      if (isAuthenticated && accessToken) {
        const customerInfo = await getCustomerInfo(accessToken)

        if (!REDIRECT_TO_SHOPIFY_ACCOUNT) {
          navigate("/account/orders")
        } else {
          window.location.href =
            process.env.GATSBY_CUSTOMER_ACCOUNTS_SHOPIFY_URL!
        }
      }
    } catch (error) {
      console.error("Error loading data:", error)
      clear()
    }
  }, [isAuthenticated, accessToken])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (isLoading) {
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

  return (
    <Layout>
      <Loader />
    </Layout>
  )
}

export default AccountPage

import { useState, useEffect } from "react"
import {
  initializeAuth,
  buildAuthorizationUrl,
  exchangeCodeForTokens,
  refreshAccessToken,
} from "../utils/customerAuth"

export function useCustomerAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if tokens exist in localStorage
    const storedAccessToken = localStorage.getItem("customer_access_token")
    const storedRefreshToken = localStorage.getItem("customer_refresh_token")
    const tokenExpiry = localStorage.getItem("token_expiry")

    if (storedAccessToken && tokenExpiry) {
      const now = Date.now()
      if (now < parseInt(tokenExpiry)) {
        setAccessToken(storedAccessToken)
        setIsAuthenticated(true)
      } else if (storedRefreshToken) {
        // Token expired, try to refresh
        refreshAccessToken(storedRefreshToken)
          .then(tokens => {
            storeTokens(
              tokens.access_token,
              tokens.refresh_token,
              tokens.id_token,
              tokens.expires_in
            )
            setAccessToken(tokens.access_token)
            setIsAuthenticated(true)
          })
          .catch(() => {
            clearTokens()
          })
      }
    }
    setIsLoading(false)
  }, [])

  const login = async () => {
    const authState = await initializeAuth()
    if (!authState) {
      console.error("authState is null or undefined!")
      return
    }

    // Store auth state in localStorage
    // tried to use sessionStorage but it gets cleared on redirect in some browsers
    const authStateStr = JSON.stringify(authState)
    localStorage.setItem("auth_state", authStateStr) // Add this as backup

    // Redirect to Shopify OAuth
    const authUrl = buildAuthorizationUrl(authState)
    window.location.href = authUrl
  }

  const handleCallback = async (code: string, state: string) => {
    const storedAuthState = localStorage.getItem("auth_state")
    if (!storedAuthState) {
      throw new Error("No auth state found")
    }

    const authState = JSON.parse(storedAuthState)

    // Verify state matches
    if (state !== authState.state) {
      throw new Error("State mismatch")
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code, authState.codeVerifier)

    storeTokens(
      tokens.access_token,
      tokens.refresh_token,
      tokens.id_token,
      tokens.expires_in
    )
    setAccessToken(tokens.access_token)
    setIsAuthenticated(true)

    // Clear auth state
    sessionStorage.removeItem("auth_state")
  }

  const clear = () => {
    clearTokens()
    setAccessToken(null)
    setIsAuthenticated(false)
  }

  const logout = () => {
    // get id token from storage for logout before clearing tokens
    const ID_TOKEN = localStorage.getItem("id_token")
    clear()
    // logout from Shopify Customer Accounts
    const SHOP_ID = process.env.GATSBY_CUSTOMER_ACCOUNTS_SHOP_ID!
    const CUSTOMER_ACCOUNT_API_URL = `https://shopify.com/${SHOP_ID}/auth/logout?id_token_hint=${ID_TOKEN}&post_logout_redirect_uri=${encodeURIComponent(
      window.location.origin + "/account"
    )}`
    window.location.href = CUSTOMER_ACCOUNT_API_URL
  }

  return {
    isAuthenticated,
    accessToken,
    isLoading,
    login,
    handleCallback,
    logout,
    clear,
  }
}

function storeTokens(
  accessToken: string,
  refreshToken: string,
  idToken: string,
  expiresIn: number
) {
  const expiry = Date.now() + expiresIn * 1000
  localStorage.setItem("customer_access_token", accessToken)
  localStorage.setItem("customer_refresh_token", refreshToken)
  localStorage.setItem("id_token", idToken)
  localStorage.setItem("token_expiry", expiry.toString())
}

function clearTokens() {
  localStorage.removeItem("customer_access_token")
  localStorage.removeItem("customer_refresh_token")
  localStorage.removeItem("id_token")
  localStorage.removeItem("token_expiry")
}

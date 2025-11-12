import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import { useCustomerAuth } from "../../hooks/useCustomerAuth"

const CallbackPage = () => {
  const { handleCallback } = useCustomerAuth()
  const [error, setError] = useState<string | null>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    // Prevent multiple executions
    if (hasRun.current) {
      console.log("Callback useEffect already ran, skipping...")
      return
    }

    hasRun.current = true

    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")
    const state = params.get("state")
    const errorParam = params.get("error")
    const errorDescription = params.get("error_description")

    if (errorParam) {
      setError(`Authentication failed: ${errorDescription || errorParam}`)
      setTimeout(() => {
        navigate("/account/?error=" + errorParam)
      }, 3000)
      return
    }

    if (code && state) {
      handleCallback(code, state)
        .then(() => {
          console.log("Authentication successful, navigating to account page")
          navigate("/account/")
        })
        .catch(error => {
          console.error("Authentication error:", error)
          setError(error.message || "Authentication failed")
          setTimeout(() => {
            navigate("/account/?error=auth_failed")
          }, 3000)
        })
    } else {
      console.error("Missing code or state in URL")
      setError("Missing authentication parameters")
      setTimeout(() => {
        navigate("/account/?error=missing_params")
      }, 3000)
    }
  }, [handleCallback])

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {error ? (
        <>
          <h1>Authentication Error</h1>
          <p style={{ color: "red" }}>{error}</p>
          <p>Redirecting...</p>
        </>
      ) : (
        <>
          <h1>Authenticating...</h1>
          <p>Please wait while we log you in.</p>
        </>
      )}
    </div>
  )
}

export default CallbackPage

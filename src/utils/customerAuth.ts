const SHOP_ID = process.env.GATSBY_CUSTOMER_ACCOUNTS_SHOP_ID!
const CUSTOMER_ACCOUNT_API_URL = `https://shopify.com/${SHOP_ID}/auth/oauth`
const CLIENT_ID = process.env.GATSBY_CUSTOMER_ACCOUNTS_CLIENT_ID!
const URL = process.env.GATSBY_CUSTOMER_ACCOUNTS_SHOP_URL!
const REDIRECT_URI = `${URL}/account/callback` // Your callback URL

interface AuthState {
  codeVerifier: string
  codeChallenge: string
  state: string
  nonce: string
}

// Helper function to convert ArrayBuffer to base64url
function base64urlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

// Helper function to convert ArrayBuffer to hex
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
}

// Generate PKCE code verifier and challenge
function generateCodeVerifier(): string {
  const randomBytes = new Uint8Array(32)
  crypto.getRandomValues(randomBytes)
  return base64urlEncode(randomBytes.buffer)
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return base64urlEncode(hash)
}

function generateRandomString(): string {
  const randomBytes = new Uint8Array(16)
  crypto.getRandomValues(randomBytes)
  return bufferToHex(randomBytes.buffer)
}

// Step 1: Initialize OAuth flow
export async function initializeAuth(): Promise<AuthState> {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  const state = generateRandomString()
  const nonce = generateRandomString()

  return {
    codeVerifier,
    codeChallenge,
    state,
    nonce,
  }
}

// Step 2: Build authorization URL
export function buildAuthorizationUrl(authState: AuthState): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    // scope: "openid email customer-account-api:full",
    scope: "openid email https://api.customers.com/auth/customer.graphql", // Adjust scopes as needed
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: authState.state,
    nonce: authState.nonce,
    code_challenge: authState.codeChallenge,
    code_challenge_method: "S256",
  })

  return `${CUSTOMER_ACCOUNT_API_URL}/authorize?${params.toString()}`
}

// Step 3: Exchange authorization code for tokens
export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string
): Promise<{
  access_token: string
  refresh_token: string

  id_token: string
  expires_in: number
}> {
  const response = await fetch(`${CUSTOMER_ACCOUNT_API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code,
      code_verifier: codeVerifier,
    }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error("Failed to exchange code for tokens")
  }

  return response.json()
}

// Step 4: Refresh access token
export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
}> {
  const response = await fetch(`${CUSTOMER_ACCOUNT_API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: CLIENT_ID,
      refresh_token: refreshToken,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to refresh access token")
  }

  return response.json()
}

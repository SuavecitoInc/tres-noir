import React from "react"
import ReactDOM from "react-dom/client"
import { CustomizerProvider } from "./src/contexts/customizer"
import { CartProvider } from "./src/contexts/storefront-cart"
import { RxInfoContextProvider } from "./src/contexts/rx-info"
import { ErrorModalProvider } from "./src/contexts/error-modal"
import { CustomerProvider } from "./src/contexts/customer"
import ErrorBoundary from "./src/components/error-boundary"
import * as Sentry from "@sentry/gatsby"

Sentry.init({
  dsn: "https://280a9ca765dc4642b0c7d17a9599f04b@o1181994.ingest.sentry.io/6550192",
  // sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.1,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 0.1,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  // tracePropagationTargets: ["https://tresnoir.com", /^\/api\//],
  release: "tres-noir@" + "2025-10",
  debug: false,
  enabled: true,
})

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}

export const wrapRootElement = ({ element }) => {
  return (
    <ErrorModalProvider>
      <CustomerProvider>
        <CartProvider>
          <CustomizerProvider>
            <RxInfoContextProvider>
              <ErrorBoundary>{element}</ErrorBoundary>
            </RxInfoContextProvider>
          </CustomizerProvider>
        </CartProvider>
      </CustomerProvider>
    </ErrorModalProvider>
  )
}

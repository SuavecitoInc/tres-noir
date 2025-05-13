import React from "react"
import ReactDOM from "react-dom/client"
import { CustomizeProvider } from "./src/contexts/customize"
import { CustomizeSafetyGlassesProvider } from "./src/contexts/customize-safety-glasses"
import { CartProvider } from "./src/contexts/storefront-cart"
import { RxInfoContextProvider } from "./src/contexts/rxInfo"
import { ErrorModalProvider } from "./src/contexts/error"
import ErrorBoundary from "./src/components/error-boundary"

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}

export const wrapRootElement = ({ element }) => {
  return (
    <ErrorModalProvider>
      <CartProvider>
        <CustomizeProvider>
          <CustomizeSafetyGlassesProvider>
            <RxInfoContextProvider>
              <ErrorBoundary>{element}</ErrorBoundary>
            </RxInfoContextProvider>
          </CustomizeSafetyGlassesProvider>
        </CustomizeProvider>
      </CartProvider>
    </ErrorModalProvider>
  )
}

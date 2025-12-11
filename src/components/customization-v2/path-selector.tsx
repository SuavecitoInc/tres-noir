import React, { useEffect, useState, useContext } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import useCustomizer from "../../contexts/customizer/hooks"
import { RxInfoContext } from "../../contexts/rxInfo"
import { Component } from "./styles"

import type {
  LocalCart,
  rxType,
} from "../../contexts/storefront-cart/types/storefront-cart"

type Props = {
  handle: string
  type: "Glasses" | "Safety Glasses"
}

// function toCamelCase(str: string) {
//   return str
//     .toLowerCase()
//     .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
// }

const PathSelector: React.FC<Props> = ({ handle, type }) => {
  const {
    setType,
    availablePaths,
    productUrl,
    setProductUrl,
    selectedCollectionPath,
    setSelectedCollectionPath,
    currentStep,
    setCurrentStep,
    setSelectedVariants,
    hasSavedCustomized,
    setHasSavedCustomized,
  } = useCustomizer()

  const { isRxAble, setRxAble, rxInfo, rxInfoDispatch } =
    useContext(RxInfoContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const foundPath = availablePaths.find(el => el.title === event.target.value)
    if (foundPath) {
      setSelectedCollectionPath(foundPath)
    } else {
      console.warn("Path not found for selected value:", event.target.value)
    }
  }

  useEffect(() => {
    console.log("Setting type in context to:", type)
    setType(type)
  }, [type, setType])

  useEffect(() => {
    // Set initial product URL based on handle
    setProductUrl(`/products/${handle}`)
  }, [handle, setProductUrl])

  // TODO: restore on refresh or mount if previously selected
  // restore on refresh
  useEffect(() => {
    if (!hasSavedCustomized.step1) {
      const isBrowser: boolean = typeof window !== "undefined"
      if (isBrowser) {
        const urlParams = new URLSearchParams(window.location.search)
        const custom_id = urlParams.get("custom_id")
        if (!custom_id) return
        const customsResume = localStorage.getItem("customs-resume")
        const checkoutString = localStorage.getItem("checkout")
        if (customsResume && custom_id && checkoutString) {
          const customsStorage = JSON.parse(customsResume) as any //SelectedVariantStorage
          const cartStorage = JSON.parse(checkoutString) as any // LocalCart
          const customInCart = cartStorage.value?.tnLineItems?.find(
            el => el.id === custom_id
          )
          const rxAttr = customInCart?.lineItems[1].shopifyItem.attributes.find(
            el => el.key === "Prescription"
          )
          if (rxAttr && rxAttr.value !== "Non-Prescription") {
            // set Rx
            const prescription = JSON.parse(rxAttr.value) as rxType
            rxInfoDispatch({
              type: `full`,
              payload: prescription,
            })
          }
          const parsedCustoms = customsStorage.value.customs
          const resumedSelectedVariants =
            parsedCustoms[Number(custom_id)].selectedVariants
          // prepare context for editing
          // setting context
          setSelectedVariants(resumedSelectedVariants)
          // set rx context
          // setting savedCustomized context so radio won't default to top option
          setHasSavedCustomized({
            step1: true,
            step2: true,
            // step3: true,
            // step4: true,
            case: true,
          })
          setCurrentStep(3)
        }
      }
    }
  }, [])

  return (
    <Component>
      <div className="step-header">
        <p>Choose your RX Type: {selectedCollectionPath.title}</p>
      </div>
      {availablePaths.map(el => {
        return (
          <div key={el.title} className="product-option">
            <GatsbyImage
              image={
                el.image && el.image.localFile
                  ? el.image.localFile.childImageSharp.gatsbyImageData
                  : el.image.localFile.childImageSharp.gatsbyImageData
              }
              alt={el.image.altText || el.title}
            />
            <div className="product-description">
              <h4>{el.title}</h4>
              <p>{el.description}</p>
            </div>
            <input
              type="radio"
              name="path"
              value={el.title}
              onChange={handleChange}
              checked={selectedCollectionPath.title === el.title}
            />
            <div className="checkmark" />
          </div>
        )
      })}
      <div className="row button-row">
        {currentStep === 0 ? (
          <Link className="button" to={productUrl}>
            GO BACK
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => console.log("Go back to previous step")}
          >
            GO BACK
          </button>
        )}
        <button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
          CONTINUE
        </button>
      </div>
    </Component>
  )
}

export default PathSelector

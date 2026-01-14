import React, { useEffect, useContext } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import useCustomizer from "../../contexts/customizer/hooks"
import { RxInfoContext } from "../../contexts/rx-info"
import { Component } from "./styles"
import { rebuildTnLineItems } from "../../contexts/storefront-cart/helpers"

type Props = {
  handle: string
  type: "Glasses" | "Safety Glasses"
}

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
    hasSavedCustomized,
    setEditData,
  } = useCustomizer()

  const { rxInfoDispatch } = useContext(RxInfoContext)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const foundPath = availablePaths.find(el => el.title === event.target.value)
    if (foundPath) {
      setSelectedCollectionPath(foundPath)
    } else {
      console.warn("Path not found for selected value:", event.target.value)
    }
  }

  useEffect(() => {
    setType(type)
  }, [type, setType])

  useEffect(() => {
    // Set initial product URL based on handle
    setProductUrl(`/products/${handle}`)
  }, [handle, setProductUrl])

  // reload saved customization data properly
  useEffect(() => {
    // Only attempt resume if not already resumed and availablePaths are loaded
    if (!hasSavedCustomized.step1 && availablePaths.length > 0) {
      const isBrowser: boolean = typeof window !== "undefined"
      if (isBrowser) {
        const urlParams = new URLSearchParams(window.location.search)
        const custom_id = urlParams.get("custom_id")
        if (!custom_id) return

        const customsResume = localStorage.getItem("customs-resume")
        const checkoutString = localStorage.getItem("checkout")

        if (customsResume && checkoutString) {
          const customsStorage = JSON.parse(customsResume) as any
          const cartStorage = JSON.parse(checkoutString) as any

          const tnLineItems = rebuildTnLineItems(cartStorage.value)
          const customInCart = tnLineItems.find(el => el.id === custom_id)

          if (customInCart) {
            console.log("Found customInCart for resuming:", customInCart)
            const parsedCustoms = customsStorage.value.customs
            const resumedSelectedVariants =
              parsedCustoms[Number(custom_id)].selectedVariants
            // extract prescription from resumed data
            const rxAttr =
              customInCart.lineItems[1].shopifyItem.attributes.find(
                el => el.key === "Prescription"
              )

            if (rxAttr && rxAttr.value !== "Non-Prescription") {
              const uploadedFileUrlAttr =
                customInCart.lineItems[1].shopifyItem.attributes.find(
                  el => el.key === "_file_url"
                )
              const uploadedFileIdAttr =
                customInCart.lineItems[1].shopifyItem.attributes.find(
                  el => el.key === "_file_id"
                )

              if (uploadedFileIdAttr && uploadedFileUrlAttr) {
                rxInfoDispatch({
                  type: "uploaded-file",
                  payload: {
                    id: uploadedFileIdAttr.value,
                    url: uploadedFileUrlAttr.value,
                  },
                })
              } else {
                const prescription = JSON.parse(rxAttr.value)
                rxInfoDispatch({
                  type: `full`,
                  payload: prescription,
                })
              }
            }

            // extract path from step1
            const step1 = resumedSelectedVariants.step1
            console.log("Resumed step1 data:", step1)
            if (step1?.product?.title) {
              const pathTitle = step1.product.title.split(" - ")[0]
              const glassesType = customInCart.lineItems[0].shopifyItem
                .merchandise.product.productType as "Glasses" | "Safety Glasses"
              console.log(
                "setting edit data with",
                resumedSelectedVariants,
                glassesType,
                pathTitle
              )
              setEditData(resumedSelectedVariants, glassesType, pathTitle)
            }
          }
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

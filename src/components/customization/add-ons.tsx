import React, { useRef } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Component } from "./styles"
import { useCustomizer } from "../../contexts/customizer"
import { isDiscounted, formatPrice } from "../../helpers/shopify"

import type { Product, Variant } from "../../contexts/customizer/types"

const DEFAULT_ITEM = {
  image: {
    originalSrc: "",
    altText: "",
    localFile: {
      childImageSharp: {
        gatsbyImageData: {},
      },
    },
  },
  legacyResourceId: "",
  price: 0,
  compareAtPrice: null,
  product: {
    title: "",
    description: "",
    onlineStoreUrl: "",
    productType: "",
    collections: {
      handle: "",
      title: "",
    },
    vendor: "",
  },
  selectedOptions: [
    {
      name: "",
      value: "",
    },
  ],
  storefrontId: "",
  sku: "",
  title: "",
}

const AddOns = ({}) => {
  const { antiReflective } = useStaticQuery(graphql`
    query AddOnsQuery {
      antiReflective: shopifyCollection(handle: { eq: "anti-reflective" }) {
        title
        description
        image {
          originalSrc
          altText
          localFile {
            id
            childImageSharp {
              gatsbyImageData(quality: 50)
            }
          }
        }
        products {
          ...shopifyProductsFields
        }
      }
    }
  `)

  const {
    currentStep,
    setCurrentStep,
    selectedVariants,
    setSelectedVariants,
    hasSavedCustomized,
    setHasSavedCustomized,
  } = useCustomizer()

  const continueBtn = useRef<HTMLButtonElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement> | null,
    variant: Variant,
    isSetFromEvent: boolean = true
  ) => {
    console.log("handleChange", evt)
    console.log("variant selected:", variant)
    const variantToUse =
      variant.storefrontId ===
      selectedVariants[`step${currentStep}`].storefrontId
        ? (DEFAULT_ITEM as unknown as Variant)
        : variant
    setHasSavedCustomized({
      ...hasSavedCustomized,
      [`step${currentStep}`]: isSetFromEvent,
    })

    setSelectedVariants({
      ...selectedVariants,
      [`step${currentStep}`]: variantToUse,
    })
  }

  const handleSteps = (num: number) => {
    // scroll to top
    const customizeDiv = topRef.current?.closest(".product-customize")
    customizeDiv?.scrollIntoView()
    setCurrentStep(currentStep + num)
  }

  return (
    <Component>
      <div className="step-header" ref={topRef}>
        <p>{antiReflective.title}</p>
      </div>
      {antiReflective.products.map((product: Product, index) => {
        // fix variant.image is null
        if (product.variants[0].image === null && product.media[0]?.image) {
          product.variants[0].image = {
            ...product.media[0].image,
            originalSrc: product.media[0].image.originalSrc || "",
            altText: product.media[0].image.altText || "",
          }
        }
        return (
          <React.Fragment key={product.id}>
            {product.variants.length === 1 &&
            product.variants[0].title.includes("Default") ? (
              <div className={`product-option`}>
                <GatsbyImage
                  image={
                    product.image && product.image.localFile
                      ? product.image.localFile.childImageSharp.gatsbyImageData
                      : product.media[0].image.localFile.childImageSharp
                          .gatsbyImageData
                  }
                  alt={product.media[0].image.altText || product.title}
                />
                <div className="product-description">
                  <h4>
                    {product.title.replace(`${antiReflective.title} - `, "")}{" "}
                    <span className="price">
                      {` + $${formatPrice(product.variants[0].price)}`}
                      {!!product.variants[0]?.compareAtPrice &&
                        isDiscounted(
                          product.variants[0].price,
                          product.variants[0].compareAtPrice
                        ) && (
                          <span>
                            {" "}
                            <span className="strikethrough-grey">
                              $
                              {formatPrice(
                                product.variants[0].compareAtPrice as any
                              )}
                            </span>
                          </span>
                        )}
                    </span>
                  </h4>
                  <p>{product.description}</p>
                </div>

                <input
                  type="checkbox"
                  name={`step${currentStep}`}
                  id={product.id}
                  aria-label={product.title}
                  onChange={evt => handleChange(evt, product.variants[0])}
                  checked={
                    product.variants[0].storefrontId ===
                    selectedVariants[`step${currentStep}`].storefrontId
                  }
                />

                <div className="checkmark" />
              </div>
            ) : (
              <div className={`product-option with-variants`}>
                <GatsbyImage
                  image={
                    product.image && product.image.localFile
                      ? product.image.localFile.childImageSharp.gatsbyImageData
                      : product.media[0].image.localFile.childImageSharp
                          .gatsbyImageData
                  }
                  alt={product.media[0].image.altText || product.title}
                />
                <div className="product-description">
                  <h4>
                    {product.title.replace(`${antiReflective.title} - `, "")}
                  </h4>
                  <p>{product.description}</p>
                </div>
                <ul className="variants">
                  {product.variants.map((variant: Variant) => (
                    <li key={variant.storefrontId}>
                      <GatsbyImage
                        image={
                          variant.image.localFile.childImageSharp
                            .gatsbyImageData
                        }
                        alt={variant.title}
                        className="variant-image"
                      />
                      <div className="variant-description">
                        <h6>
                          {variant.title}
                          <span className="price">
                            {` + $${variant.price}`}
                            {isDiscounted(
                              variant.price,
                              variant.compareAtPrice
                            ) && (
                              <span>
                                {" "}
                                <span className="strikethrough-grey">
                                  ${variant.compareAtPrice}
                                </span>
                              </span>
                            )}
                          </span>
                        </h6>
                      </div>
                      <input
                        type="radio"
                        name={`step${currentStep}`}
                        id={product.id}
                        aria-label={product.title}
                        onChange={evt => handleChange(evt, variant)}
                        checked={
                          variant.storefrontId ===
                          selectedVariants[`step${currentStep}`].storefrontId
                        }
                      />

                      <div className="checkmark" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </React.Fragment>
        )
      })}
      <div className="row button-row">
        <button type="button" onClick={() => handleSteps(-1)}>
          GO BACK
        </button>

        <button type="button" onClick={() => handleSteps(1)} ref={continueBtn}>
          CONTINUE
        </button>
      </div>
    </Component>
  )
}

export default AddOns

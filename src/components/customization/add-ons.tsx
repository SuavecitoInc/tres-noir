import React, { useRef, useState, useMemo, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Component } from "./styles"
import { useCustomizer } from "../../contexts/customizer"
import { isDiscounted, formatPrice } from "../../helpers/shopify"

import type {
  AvailablePath,
  Product,
  Variant,
} from "../../contexts/customizer/types"
import useCollectionDiscountedPricing from "../../hooks/useCollectionDiscountedPricing"

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

type Props = {
  handle: string
}

const AddOns = ({ handle }: Props) => {
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

  // delete
  console.log("ADDONS MOUNT", selectedVariants)

  const [currentCollection, setCurrentCollection] =
    useState<AvailablePath>(antiReflective)

  const continueBtn = useRef<HTMLButtonElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  // start discounted prices
  const prices = useMemo(
    () =>
      antiReflective?.products
        ? antiReflective?.products
            ?.map(p =>
              p?.variants?.map(v => {
                return {
                  id: v.legacyResourceId,
                  price: v.price,
                  handle: p.handle,
                }
              })
            )
            .flat()
        : [],
    [antiReflective]
  )

  const { offer, isApplicable, discountedPrices } =
    useCollectionDiscountedPricing({ prices, handle })

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement> | null,
    variant: Variant,
    isSetFromEvent: boolean = true
  ) => {
    setHasSavedCustomized({
      ...hasSavedCustomized,
      [`step${currentStep}`]: isSetFromEvent,
    })

    setSelectedVariants({
      ...selectedVariants,
      [`step${currentStep}`]: variant,
    })
  }

  const handleSteps = (num: number) => {
    // scroll to top
    const customizeDiv = topRef.current?.closest(".product-customize")
    customizeDiv?.scrollIntoView()
    setCurrentStep(currentStep + num)
  }

  // discount swap hook
  useEffect(() => {
    if (isApplicable && discountedPrices) {
      console.log("discounted pricing", discountedPrices)
      const tempCollection = JSON.parse(JSON.stringify(antiReflective))

      const patchedCollection = tempCollection.products.map(p => {
        const patchedVariants = p.variants.map(v => {
          const patchedPrice = discountedPrices.find(
            el => el.id === v.legacyResourceId
          )
          if (patchedPrice) {
            v.compareAtPrice = v.price
            v.price = patchedPrice.discountedPrice
          }
          return v
        })
        p.variants = patchedVariants
        return p
      })
      setCurrentCollection(col => ({
        ...col,
        title: tempCollection.title,
        products: patchedCollection,
      }))
    }
  }, [antiReflective, offer, isApplicable, discountedPrices])

  useEffect(() => {
    if (hasSavedCustomized[`step${currentStep}`] === true) {
      // setting variant to saved one if set
      handleChange(null, selectedVariants[`step${currentStep}`], true)
    }
  }, []) // currentCollection?.products

  return (
    <Component>
      <div className="step-header" ref={topRef}>
        <p>{currentCollection.title}</p>
      </div>
      {currentCollection.products.map((product: Product) => {
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
                    {product.title.replace(`${currentCollection.title} - `, "")}{" "}
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
                  onChange={evt => {
                    const v =
                      product.variants[0].storefrontId ===
                      selectedVariants[`step${currentStep}`].storefrontId
                        ? (DEFAULT_ITEM as unknown as Variant)
                        : product.variants[0]
                    handleChange(evt, v)
                  }}
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
                    {product.title.replace(`${currentCollection.title} - `, "")}
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

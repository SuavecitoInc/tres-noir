import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { GatsbyImage, StaticImage, IGatsbyImageData } from "gatsby-plugin-image"
import { useCustomizer } from "../../contexts/customizer"
import { useCart } from "../../contexts/storefront-cart"
import { RxInfoContext } from "../../contexts/rx-info"
import { addedCustomizedToCartGTMEvent } from "../../helpers/gtm"
import { ShopifyProductVariant } from "../../types/customize"
import CaseGridCustomize from "../case-grid-customize"
import Spinner from "../spinner"
import { navigate } from "gatsby"
import { isDiscounted, formatPrice } from "../../helpers/shopify"

const Component = styled.div`
  padding: 10px;
  .product-option {
    background-color: var(--color-grey-light);
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    padding: 10px;
    position: relative;
    &.with-variants {
      flex-wrap: wrap;
    }
    > div {
      padding: 0 10px;
    }
    p {
      line-height: 1;
      margin-bottom: 0;
    }
    .gatsby-image-wrapper {
      max-width: 40px;
      max-height: 40px;
    }
    img {
      align-self: center;
    }
    .product-description {
      max-width: calc(100% - 65px);
      min-height: 40px;
    }
    h4,
    h6 {
      font-family: var(--sub-heading-font);
      margin-bottom: 0;
      text-transform: uppercase;
    }
    .edit-btn {
      background-color: transparent;
      color: #000;
      border: none;
      top: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: 2;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  button,
  .button {
    background-color: #000;
    border-radius: 0;
    border: 1px solid #000;
    color: #fff;
    display: block;
    font-family: var(--sub-heading-font);
    padding: 10px 20px;
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }
  }
  .summary {
    color: var(--color-grey-dark);
    text-transform: uppercase;
    text-align: right;
    font-size: 1rem;
    line-height: 1.1rem;
    padding: 0.5rem 0;
    p {
      margin-bottom: 0.2rem;
      span {
        margin-left: 0.75rem;
      }
    }
  }
  .add-to-cart {
    min-width: 141px;
    @media only screen and (max-width: 468px) {
      min-width: 130px;
    }
  }
  .edit-btn {
    background-color: transparent;
    color: #000;
    border: none;
  }
  .strikethrough-grey {
    color: var(--color-grey-dark);
    text-decoration: line-through;
  }
`

const Step5 = (props: {
  productTitle: string
  currentPrice: any
  variant: ShopifyProductVariant
  productImage: any
  resumedItem: string | null | undefined
  completeVariant: any
  casesAvailable: string[]
}) => {
  const {
    productTitle,
    currentPrice,
    variant,
    productImage,
    resumedItem,
    completeVariant,
    casesAvailable,
  } = props
  const {
    currentStep,
    setCurrentStep,
    productUrl,
    selectedVariants,
    setSelectedVariants,
    setSelectedVariantsToDefault,
  } = useCustomizer()

  const hasStep2Item = selectedVariants.step2.storefrontId !== ""

  // const { bundledCustoms, bundledDispatch } = useContext(CustomProductsContext)
  const {
    addProductCustomToCart,
    removeCustomProductWithId,
    isAddingToCart,
    setIsAddingToCart,
    isRemovingFromCart,
  } = useCart()
  const { isRxAble, setRxAble, rxInfo, rxInfoDispatch } =
    useContext(RxInfoContext)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    return () => {
      if (addedToCart) {
        setCurrentStep(1)
        setSelectedVariantsToDefault()
        rxInfoDispatch({
          type: `reset`,
        })
      }
    }
  }, [addedToCart])

  const buttonLabel = () => {
    if (resumedItem) {
      return "SAVE CHANGES"
    } else {
      return "ADD TO CART"
    }
  }

  const handleAddToCart = async () => {
    const { step1, step2 } = selectedVariants

    const today = new Date()
    const matchingKey: string = today.valueOf().toString()
    const colorName = variant.title.split("-")[0]
    const stepItems = [
      {
        variantId: step1.storefrontId,
        quantity: 1,
        attributes: [
          {
            key: "customizationId",
            value: matchingKey,
          },
          {
            key: "customizationStep",
            value: "1",
          },
          {
            key: "Prescription",
            value: step1.product.title.includes("Non-Prescription")
              ? "Non-Prescription"
              : step1.product.title === "Reader's"
              ? JSON.stringify({ lensPower: rxInfo.lensPower })
              : JSON.stringify({
                  right: rxInfo.right,
                  left: rxInfo.left,
                }),
          },
          {
            key: "_frameName",
            value: `${variant.product.title} - ${colorName}`,
          },
        ],
      },
    ]

    // if step2 item selected add it
    if (hasStep2Item) {
      stepItems.push({
        variantId: step2.storefrontId,
        quantity: 1,
        attributes: [
          {
            key: "customizationId",
            value: matchingKey,
          },
          {
            key: "customizationStep",
            value: "2",
          },
          {
            key: "_frameName",
            value: `${step2.product.title} - ${colorName}`,
          },
        ],
      })
    }

    // add the case
    stepItems.push({
      variantId: selectedVariants.case.storefrontId,
      quantity: 1,
      attributes: [
        {
          key: "customizationId",
          value: matchingKey,
        },
        {
          key: "customizationStep",
          value: "3",
        },
        {
          key: "_frameName",
          value: `${variant.product.title} - ${colorName}`,
        },
      ],
    })

    const frameVariant = {
      variantId: variant.storefrontId,
      quantity: 1,
      attributes: [
        {
          key: "customizationId",
          value: matchingKey,
        },
        {
          key: "customizationStep",
          value: "0",
        },
        {
          key: "_frameName",
          value: `${variant.product.title} - ${colorName}`,
        },
      ],
    }
    stepItems.unshift(frameVariant)
    if (resumedItem) {
      await removeCustomProductWithId(resumedItem)
      await addProductCustomToCart(
        stepItems,
        matchingKey,
        productImage,
        selectedVariants,
        variant.sku,
        variant.product.handle,
        false
      )
      //
    } else {
      await addProductCustomToCart(
        stepItems,
        matchingKey,
        productImage,
        selectedVariants,
        variant.sku,
        variant.product.handle,
        false
      )
    }
    // boolean to determine whether a frame has been added to cart
    // if true, then the selectedVariant context will reset and currentStep will be 1
    setAddedToCart(true)

    if (resumedItem) {
      setIsAddingToCart(false)
      navigate("/cart")
    }

    // GTM Event
    const productData = {
      main: {
        collections: variant.product.collections.map(
          (collection: { title: string }) => collection.title
        ),
        compareAtPrice: "",
        image: variant?.image?.originalSrc ? variant.image?.originalSrc : "",
        legacyResourceId: variant.legacyResourceId,
        price: variant.price,
        productType: variant.product.productType,
        sku: variant.sku,
        title: variant.title,
        url: variant.product.onlineStoreUrl,
        vendor: variant.product.vendor,
      },
      addOns: [
        {
          title: step1.title,
          legacyResourceId: step1.legacyResourceId,
          sku: step1.sku,
          productType: step1.product.productType,
          image: step1?.image?.originalSrc ? step1.image?.originalSrc : "",
          url: step1.product.onlineStoreUrl,
          vendor: step1.product.vendor,
          price: step1.price,
          compareAtPrice: "",
        },
      ],
    }
    // if step2 item selected add it
    if (hasStep2Item) {
      productData.addOns.push({
        title: step2.title,
        legacyResourceId: step2.legacyResourceId,
        sku: step2.sku,
        productType: step2.product.productType,
        image: step1?.image?.originalSrc ? step2.image?.originalSrc : "",
        url: step2.product.onlineStoreUrl,
        vendor: step2.product.vendor,
        price: step2.price,
        compareAtPrice: "",
      })
    }
    // add cases
    productData.addOns.push({
      title: selectedVariants.case.title,
      legacyResourceId: selectedVariants.case.legacyResourceId,
      sku: selectedVariants.case.sku,
      productType: selectedVariants.case.product.productType,
      image: selectedVariants.case?.image?.originalSrc
        ? selectedVariants.case.image?.originalSrc
        : "",
      url: selectedVariants.case.product.onlineStoreUrl,
      vendor: selectedVariants.case.product.vendor,
      price: selectedVariants.case.price,
      compareAtPrice: "",
    })
    addedCustomizedToCartGTMEvent(productData)
    setIsAddingToCart(false)
    // todo: fix this type issue
    // @ts-ignore
    navigate("/cart")
  }

  return (
    <Component>
      <p>REVIEW YOUR CUSTOM GLASSES</p>

      {Array.from({ length: hasStep2Item ? 2 : 1 }, (_, i) => (
        <div key={i} className="product-option">
          <GatsbyImage
            image={
              selectedVariants[`step${i + 1}`].image.localFile.childImageSharp
                .gatsbyImageData as IGatsbyImageData
            }
            alt={
              selectedVariants[`step${i + 1}`].image.altText || "Placeholder"
            }
          />
          <div className="product-description">
            <h4>
              {selectedVariants[`step${i + 1}`].product.title}{" "}
              <span className="price">
                + ${formatPrice(selectedVariants[`step${i + 1}`].price)}
                {!!selectedVariants[`step${i + 1}`].compareAtPrice &&
                  isDiscounted(
                    selectedVariants[`step${i + 1}`].price,
                    selectedVariants[`step${i + 1}`].compareAtPrice
                  ) && (
                    <span>
                      {" "}
                      <span className="strikethrough-grey">
                        $
                        {formatPrice(
                          selectedVariants[`step${i + 1}`].compareAtPrice
                        )}
                      </span>
                    </span>
                  )}
              </span>
            </h4>
            <p>{selectedVariants[`step${i + 1}`].product.description}</p>
          </div>

          <button
            className="edit-btn"
            type="button"
            onClick={() => setCurrentStep(i + 1)}
          >
            <StaticImage
              src="../../images/edit.png"
              alt="Edit Line Item"
              placeholder="dominantColor"
              style={{ marginBottom: 0, maxWidth: 26 }}
            />
          </button>
        </div>
      ))}

      <div className="summary">
        <p className="title">
          <span>Customized: </span>{" "}
          <span>
            {productTitle} - {variant.title}
          </span>
        </p>
        <p className="substotal">
          <span>Sub-Total: </span> <span>${currentPrice.toFixed(2)}</span>
        </p>
      </div>
      <div className="row">
        <button
          className="btn"
          type="button"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          GO BACK
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          className="add-to-cart btn"
          disabled={isAddingToCart || isRemovingFromCart}
        >
          {isAddingToCart || isRemovingFromCart ? <Spinner /> : buttonLabel()}
        </button>
      </div>
      <CaseGridCustomize
        casesAvailable={casesAvailable}
        type={variant.product.productType as "Glasses" | "Safety Glasses"}
      />
    </Component>
  )
}

export default Step5

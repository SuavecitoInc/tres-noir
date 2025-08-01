import React, { useContext, useEffect, useState, useRef } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CustomizationProgress from "../components/customization-safety-glasses/progress"
import Step1 from "../components/customization-safety-glasses/step1"
import Summary from "../components/customization-safety-glasses/summary"
import { CustomizeContext } from "../contexts/customize-safety-glasses"
import { changeImage } from "../components/customization-safety-glasses/functions"
import {
  ContentfulProduct,
  ContentfulProductVariant,
  ShopifyProduct,
  ShopifyProductVariant,
} from "../types/customize"
import { ImageStorage } from "../contexts/storefront-cart/types/storefront-cart"
import { useDiscountedPricing } from "../hooks/useDiscountedPricing"
import { SafetyLensColor } from "../types/safety"

const Page = styled.div`
  .row {
    display: flex;
    flex-direction: row;
    @media only screen and (max-width: 760px) {
      &.product-customize {
        display: block;
      }
    }
  }
  .col {
    display: flex;
    flex-direction: column;
    &.preview {
      flex: 1.2;
      .gatsby-image-wrapper {
        position: sticky;
        top: 1px;
      }
    }
    &.steps {
      flex: 1;
    }
  }
  .current-price {
    text-align: right;
    span {
      background-color: var(--color-grey-dark);
      color: #fff;
      display: inline-block;
      font-family: var(--sub-heading-font);
      padding: 5px;
    }
  }
  .mobile {
    display: none;
    @media screen and (max-width: 760px) {
      display: block;
    }
  }
  .desktop {
    display: block;
    @media screen and (max-width: 760px) {
      display: none;
    }
  }
  .sticky-mobile {
    @media screen and (max-width: 760px) {
      position: sticky;
      top: 0;
      z-index: 100;
      background: white;
      padding-bottom: 5px;
      display: flex;
    }
  }
  .button-row {
    @media screen and (max-width: 760px) {
      position: sticky;
      bottom: 0;
      // padding: 10px 0;
      border-top: 1px solid grey;
      width: calc(100% + 30px);
      transform: translateX(-15px);
      padding: 10px 15px;
    }
    background-color: white;
  }
  /* new */
  @media screen and (max-width: 760px) {
    .sticky-mobile {
      width: calc(100% + 30px);
      transform: translateX(-15px);
      padding: 0 15px;
      border-bottom: 1px solid grey;
      // box-shadow: 0 4px 4px rgba(128, 128, 128, 0.4);
      .mobile-flex {
        display: flex;
        flex-direction: row;
        div {
          flex: 1;
          &.current-price {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
      }
    }
  }
`

const Customize = ({
  data: { contentfulProduct, shopifyProduct },
}: {
  data: {
    contentfulProduct: ContentfulProduct
    shopifyProduct: ShopifyProduct
  }
}) => {
  const createDiscountApiPayload = (): any[] => {
    try {
      return shopifyProduct.variants.map(v => ({
        price: v.price,
        id: v.legacyResourceId,
      }))
    } catch (error) {
      return []
    }
  }

  const { currentStep, setProductUrl, selectedVariants } =
    useContext(CustomizeContext)
  const [variant, setVariant] = useState({
    contentful: contentfulProduct?.variants && contentfulProduct.variants[0],
    shopify: shopifyProduct.variants[0],
  })
  const [currentPrice, setCurrentPrice] = useState<number>(
    shopifyProduct.variants[0].price
  )

  const [currentImage, setCurrentImage] = useState({
    data:
      variant?.contentful &&
      variant.contentful.customizations?.clear?.localFile?.childImageSharp.data,
    altText:
      variant?.contentful && variant.contentful.customizations?.clear?.title,
  })
  const previewRef = useRef<HTMLDivElement>(null)

  const { discountedPrice, isApplicable, offer } = useDiscountedPricing({
    productId: shopifyProduct.legacyResourceId,
    prices: createDiscountApiPayload(),
    selectedVariantId: variant.shopify.legacyResourceId,
    handle: variant.shopify.product.handle,
  })

  useEffect(() => {
    const isBrowser = typeof window !== "undefined"
    if (!isBrowser) return
    const urlParams = new URLSearchParams(window.location.search)
    const sku = urlParams.get("variant")
    const lensType = urlParams.get("lens_type")
    const contentful = contentfulProduct.variants.find(
      (_variant: ContentfulProductVariant) => _variant.sku === sku
    )
    const shopify = shopifyProduct.variants.find(
      (_variant: ShopifyProductVariant) => _variant.sku === sku
    )
    if (contentful && shopify) {
      const _variant = { contentful, shopify }
      setVariant(_variant)
      let handle = `/products/${contentfulProduct.handle}?variant=${contentful.sku}`
      if (lensType) {
        handle = `${handle}&lens_type=${lensType}`
      }
      setProductUrl(handle)
    }
  }, [
    contentfulProduct?.handle,
    contentfulProduct?.variants,
    // setProductUrl,
    shopifyProduct.variants,
  ])

  /* UPDATE PRICING */
  useEffect(() => {
    // patch price if applicable
    const variantPrice =
      isApplicable && discountedPrice ? discountedPrice : variant.shopify.price
    let totalPrice = Number(variantPrice)

    for (let i = currentStep; i > 0; --i) {
      const el =
        i === 2 ? selectedVariants[`case`] : selectedVariants[`step${i}`]
      totalPrice += Number(el.price)
    }
    setCurrentPrice(totalPrice)
  }, [selectedVariants, isApplicable, discountedPrice, variant])

  /* UPDATE IMAGE */
  useEffect(() => {
    changeImage(
      currentStep,
      selectedVariants,
      // currentImage,
      setCurrentImage,
      variant
    )
  }, [variant, selectedVariants, currentStep])

  useEffect(() => {
    const isBrowser = typeof window !== "undefined"
    if (!isBrowser) return
    const urlParams = new URLSearchParams(window.location.search)
    const customId = urlParams.get("custom_id")
    if (customId) {
      // using customizationId as a url param, this will grab the edited item's image and set it
      const customImageStorage = localStorage.getItem("cart-images")
      if (customImageStorage) {
        const customImageLocal = JSON.parse(customImageStorage) as ImageStorage
        const parsedCustoms = customImageLocal.value
        const correctImage = parsedCustoms.images[customId]
        console.log("correctImage", correctImage)
        if (correctImage) {
          setCurrentImage({
            data: correctImage,
            altText: "Customized frames",
          })
        }
      }
    }
  }, [])

  const getResumedItem = () => {
    const isBrowser = typeof window !== "undefined"
    if (!isBrowser) return
    const urlParams = new URLSearchParams(window.location.search)
    const customId = urlParams.get("custom_id")
    return customId
  }

  return (
    <Layout>
      <SEO title="Customize" shouldIndex={false} />
      <Page>
        <div className="row product-customize">
          <div className="desktop col preview" ref={previewRef}>
            <GatsbyImage
              image={currentImage.data}
              alt={currentImage.altText}
              loading="eager"
            />
          </div>
          {/* div for sticky mobile */}
          <div className="mobile col sticky-mobile" ref={previewRef}>
            <div className="mobile-flex">
              <GatsbyImage
                image={currentImage.data}
                alt={currentImage.altText}
                loading="eager"
              />
              <div className="current-price">
                <p>
                  <span>${currentPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <CustomizationProgress step={currentStep} />
          </div>
          <div className="col steps">
            <div className="desktop">
              <CustomizationProgress step={currentStep} />
            </div>
            <p className="current-price desktop">
              <span>${currentPrice.toFixed(2)}</span>
            </p>
            <div className="current-step">
              {currentStep === 1 && (
                <Step1
                  handle={shopifyProduct.handle}
                  lens={variant.contentful.colorName as SafetyLensColor}
                />
              )}
              {currentStep === 2 && (
                <Summary
                  productTitle={shopifyProduct.title}
                  variant={variant.shopify}
                  currentPrice={currentPrice}
                  productImage={currentImage.data}
                  resumedItem={getResumedItem()}
                  completeVariant={variant}
                  casesAvailable={contentfulProduct.casesAvailable}
                />
              )}
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  )
}

export default Customize

export const query = graphql`
  query CustomizeQuery($handle: String) {
    contentfulProduct(handle: { eq: $handle }) {
      handle
      fitDimensions
      casesAvailable
      variants {
        colorName
        sku
        colorImage {
          localFile {
            childImageSharp {
              data: gatsbyImageData(placeholder: DOMINANT_COLOR, quality: 40)
            }
          }
          title
        }
        customizations {
          bifocal {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          bifocalGradientTintSmokeLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          bifocalGradientTintBrownLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          bifocalGradientTintG15Lenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          clear {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          gradientTintSmokeLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          gradientTintBrownLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          gradientTintG15Lenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesSmokeLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesBrownLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesGreenLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesOrangeLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesYellowLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesBlueLenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesG15Lenses {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesSmokeLensesBifocal {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesBrownLensesBifocal {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesGreenLensesBifocal {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesOrangeLensesBifocal {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesYellowLensesBifocal {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesBlueLensesBifocal {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
          sunGlassesG15LensesBifocal {
            localFile {
              childImageSharp {
                data: gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  quality: 60
                  width: 800
                )
              }
            }
            title
          }
        }
        featuredImage {
          localFile {
            childImageSharp {
              data: gatsbyImageData
            }
          }
          title
        }
        imageSet {
          localFile {
            childImageSharp {
              data: gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                width: 2048
                height: 1365
              )
            }
          }
          title
        }
        id
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      priceRangeV2 {
        minVariantPrice {
          amount
        }
        maxVariantPrice {
          amount
        }
      }
      title
      handle
      id
      legacyResourceId
      variants {
        availableForSale
        compareAtPrice
        id
        legacyResourceId
        price
        sku
        storefrontId
        title
        product {
          legacyResourceId
          title
          handle
          onlineStoreUrl
          productType
          collections {
            handle
            title
          }
        }
      }
    }
  }
`

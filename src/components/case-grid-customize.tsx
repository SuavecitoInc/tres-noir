import React, { useContext, useEffect } from "react"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { useStaticQuery, Link, graphql } from "gatsby"
import { ShopifyVariant } from "../types/global"
import { CustomizeContext } from "../contexts/customize"

import { useCaseCollection } from "../hooks/useCaseCollection"

const Component = styled.div`
  margin-top: 35px;
  width: 75%;
  @media screen and (max-width: 750px) {
    width: 100%;
  }
  margin-bottom: 35px;
  p {
    margin: 0;
  }
  .heading {
    text-transform: uppercase;
    font-size: 1.5rem;
    font-family: var(--sub-heading-font);
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    row-gap: 10px;
    column-gap: 50px;
    .product-flex {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .title {
      font-family: var(--heading-font);
      text-transform: uppercase;
      font-weight: normal;
      text-align: center;
      margin: 0;
    }
    .price {
      font-family: var(--sub-heading-font);
      color: var(--color-grey-dark);
    }
  }
`

const CaseGridCustomize = () => {
  const {
    selectedVariants,
    setSelectedVariants,
    hasSavedCustomized,
    setHasSavedCustomized,
  } = useContext(CustomizeContext)

  const caseCollection = useCaseCollection()

  const formatTitle = (str: string) => {
    let spl = str.split("AO")[0]
    return spl.slice(0, -2)
  }

  const formatMoney = (price: string) => {
    if (price === "0.00") {
      return "FREE"
    }
    return `$${price} USD`
  }

  const handleChange = (variant: ShopifyVariant, isSetFromEvent: boolean) => {
    setSelectedVariants({
      ...selectedVariants,
      ["case"]: variant,
    })
    setHasSavedCustomized({
      ...hasSavedCustomized,
      ["case"]: isSetFromEvent,
    })
  }

  useEffect(() => {
    if (hasSavedCustomized["case"] === false) {
      handleChange(caseCollection[0].variants[0], false)
    }
  }, [])

  return (
    <Component>
      <p className="heading">Choose your case:</p>
      <div className="container">
        {caseCollection &&
          caseCollection.map(product => {
            return (
              <div key={product.id} className="product-flex">
                <div className="case-image">
                  {product.featuredImage?.localFile ? (
                    <GatsbyImage
                      image={
                        product.featuredImage.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      alt={product.title}
                    ></GatsbyImage>
                  ) : (
                    <StaticImage
                      src="../images/product-no-image.jpg"
                      alt={product.title}
                    ></StaticImage>
                  )}
                </div>
                <div>
                  <p className="title">{formatTitle(product.title)}</p>
                </div>
                <div>
                  <p className="price">
                    {formatMoney(product.variants[0].price)}
                  </p>
                </div>
                <div>
                  <input
                    type="radio"
                    name="case-select"
                    id={`case-${product.title}`}
                    aria-label={product.title}
                    onChange={() => handleChange(product.variants[0], true)}
                    checked={
                      product.variants[0].storefrontId ===
                      selectedVariants["case"].storefrontId
                    }
                  />
                </div>
              </div>
            )
          })}
      </div>
    </Component>
  )
}

export default CaseGridCustomize

import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Form from "./form"
import useCollectionDiscountedPricing from "../../hooks/useCollectionDiscountedPricing"

type Props = {
  handle: string
  lens: "smoke" | "clear" | "yellow"
}
const Step1: React.FC<Props> = ({ handle, lens }) => {
  const { shopifyCollection } = useStaticQuery(graphql`
    query SafetyGlassesStep1Query {
      shopifyCollection(handle: { eq: "safety-glasses-rx-type" }) {
        title
        products {
          ...shopifyProductsFields
        }
      }
    }
  `)

  const [filteredCollection, setFilteredCollection] =
    useState(shopifyCollection)

  // start discounted prices
  const prices = shopifyCollection.products.map(p => ({
    id: p.variants[0].legacyResourceId,
    price: p.variants[0].price,
    handle: p.handle,
  }))

  const { offer, isApplicable, discountedPrices } =
    useCollectionDiscountedPricing({ prices, handle })

  useEffect(() => {
    if (isApplicable && discountedPrices) {
      const tempCollection = JSON.parse(JSON.stringify(shopifyCollection))

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
      setFilteredCollection({
        title: tempCollection.title,
        products: patchedCollection,
      })
    }
  }, [shopifyCollection, offer, isApplicable, discountedPrices])
  // end discounted prices

  return (
    <Form shopifyCollection={filteredCollection} handle={handle} lens={lens} />
  )
}

export default Step1

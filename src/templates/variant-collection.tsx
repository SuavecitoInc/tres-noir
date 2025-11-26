import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Variant from "../components/variant"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FreeShipping from "../components/free-shipping"
import CollectionImage from "../components/collection-image"
import Filters from "../components/filters-contentful-variants"
import { viewedCollectionGTMEvent } from "../helpers/gtm"
import { ContentfulProductVariant } from "../types/contentful"
import { useCollectionDiscountedPricing } from "../hooks/useCollectionDiscountedPricing"

const Page = styled.div`
  .desc-container {
    margin-top: 15px;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    font-family: var(--sub-heading-font);
    .collection-description {
      p {
        margin: 0;
      }
      text-align: center;
      margin: 0 auto;
      max-width: 800px;
    }
  }
  @media only screen and (max-width: 600px) {
    .desc-container {
      margin-top: 0;
    }
  }
`

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 55px;
`

const VariantCollection = ({
  data,
}: {
  data: {
    contentfulVariantCollection: any
    shopifyCollection: { products: any[] }
    contentfulHomepage: any
  }
}) => {
  const {
    contentfulVariantCollection: collection,
    shopifyCollection,
    contentfulHomepage,
  } = data
  const defaultFilters = { frameWidth: "", colorName: "" }
  const [filters, setFilters] = useState<{
    frameWidth: string
    colorName: string
  }>(defaultFilters)
  const [variants, setVariants] = useState<ContentfulProductVariant[]>(
    collection.variants
  )

  // get shopify variant info for discount pricing
  const getShopifyVariant = (
    variant
  ): {
    id: string
    price: number
    handle: string
  } => {
    try {
      const handle = variant.product[0].handle

      const shopifyProduct = shopifyCollection.products.find(
        shopifyProduct =>
          shopifyProduct.handle.toLowerCase() === handle.toLowerCase()
      )

      const shopifyVariant = shopifyProduct.variants.find(
        shopifyVariant => shopifyVariant.sku === variant.sku
      )

      return {
        id: shopifyVariant.legacyResourceId,
        price: shopifyVariant.price,
        handle: shopifyProduct.handle,
      }
    } catch (error) {
      return {
        id: "",
        price: 0,
        handle: "",
      }
    }
  }

  const prices = variants.map(variant => getShopifyVariant(variant))
  console.log("prices:", prices)
  const { isApplicable, discountedPrices } = useCollectionDiscountedPricing({
    prices,
    handle: collection.handle,
  })

  useEffect(() => {
    const collectionInfo = {
      handle: collection.handle,
      title: collection.name,
    }
    viewedCollectionGTMEvent(collectionInfo)
  }, [])

  const getShopifyPrice = (
    variant
  ): {
    id: string
    price: number
    compareAtPrice: number
  } => {
    try {
      const handle = variant.product[0].handle

      const shopifyProduct = shopifyCollection.products.find(
        shopifyProduct =>
          shopifyProduct.handle.toLowerCase() === handle.toLowerCase()
      )

      const shopifyVariant = shopifyProduct.variants.find(
        shopifyVariant => shopifyVariant.sku === variant.sku
      )

      return {
        id: shopifyVariant.legacyResourceId,
        price: shopifyVariant.price,
        compareAtPrice: shopifyVariant.compareAtPrice ?? null,
      }
    } catch (error) {
      return {
        id: "",
        price: 0,
        compareAtPrice: 0,
      }
    }
  }

  const getColorOptionName = variant => {
    try {
      const handle = variant.product[0].handle

      if (!shopifyCollection?.products) return null

      const shopifyProduct = shopifyCollection.products.find(
        shopifyProduct =>
          shopifyProduct.handle.toLowerCase() === handle.toLowerCase()
      )

      const shopifyVariant = shopifyProduct.variants.find(
        shopifyVariant => shopifyVariant.sku === variant.sku
      )

      const optionName = shopifyVariant.selectedOptions.find(
        option => option.name.toLowerCase() === "color"
      ).value

      const formattedOptionName = optionName.split("-")[0]

      return formattedOptionName.trim()
    } catch (error) {
      return variant.colorName
    }
  }

  const getBadge = variant => {
    const handle = variant.product[0].handle

    if (!shopifyCollection?.products) return null

    const shopifyProduct = shopifyCollection.products.find(
      shopifyProduct =>
        shopifyProduct.handle.toLowerCase() === handle.toLowerCase()
    )

    const isExcludedFromDeals =
      (shopifyProduct && shopifyProduct.handle.includes("mooneyes")) ||
      (shopifyProduct && shopifyProduct.handle.includes("loser-machine"))

    // only enable BOGO, NEW, and NEW COLOR badges for variant collection
    // variant collection currently only used for clearance and collaboration items, neither of which are included in sales
    // keep BOGO b/c clearance items are included in BOGO sales
    try {
      // enable random badge, product must be tagged with `badge:SKU:<BADGE_NAME>`
      const badgeTag = shopifyProduct.tags.find(tag =>
        tag.toLowerCase().startsWith(`badge:${variant.sku.toLowerCase()}:`)
      )
      console.log("badgeTag:", badgeTag)
      if (badgeTag) {
        const badgeLabel = badgeTag.split(`badge:${variant.sku}:`)[1]
        return {
          label: badgeLabel,
          color: "#39b54a",
        }
      }

      // bogo is enabled and product is not an exclusion (e.g. collaboration products)
      if (contentfulHomepage.enableBogo && !isExcludedFromDeals) {
        return {
          label: "BOGO",
          color: "#0ee2e2",
        }
      }
      // new variant color badge
      if (
        shopifyProduct.tags.some(
          tag =>
            tag === `new_color:${getColorOptionName(variant)}` ||
            tag === `new_color: ${getColorOptionName(variant)}`
        )
      ) {
        return {
          label: "New Color",
          color: "green",
        }
      }
      if (shopifyProduct.tags.some(tag => tag === `new_release`)) {
        return {
          label: "New",
          color: "#DAA520",
        }
      }
      console.log("no badge found")
      return null
    } catch (error) {
      return null
    }
  }

  return (
    <Layout>
      <SEO
        title={collection.title}
        description={collection.description}
        image={{
          url: collection.image.localFile.publicURL,
          alt: collection.title,
        }}
      />
      <Page className="page">
        <FreeShipping />
        {collection.image && (
          <CollectionImage
            collectionImage={collection.image?.localFile?.childImageSharp?.data}
          />
        )}
        <div className="desc-container">
          <p className="collection-description">{collection.description}</p>
        </div>

        <div className="filters-container">
          <Filters
            collection={collection}
            filters={filters}
            setFilters={setFilters}
            setVariants={setVariants as any}
          />
        </div>

        <Grid>
          {variants.length ? (
            variants.map(variant => {
              const { id, price, compareAtPrice } = getShopifyPrice(variant)
              const productTitle = variant.product[0].title
              const colorName = getColorOptionName(variant)
              const formattedTitle = [productTitle, colorName].join(" - ")

              const found = discountedPrices?.find(el => el.id === id)

              const badge =
                found && found?.offer
                  ? { label: found?.offer, color: "red" }
                  : getBadge(variant)

              return (
                <Variant
                  key={variant.id}
                  contentfulData={variant}
                  productHandle={variant.product[0].handle}
                  price={found ? found.discountedPrice : price}
                  name={formattedTitle}
                  compareAtPrice={found ? price : compareAtPrice}
                  badge={badge}
                />
              )
            })
          ) : (
            <p>No Products found please remove filters and try again.</p>
          )}
        </Grid>
      </Page>
    </Layout>
  )
}

export default VariantCollection

export const query = graphql`
  query VariantCollectionQuery($handle: String!) {
    contentfulVariantCollection(handle: { eq: $handle }) {
      id
      handle
      title
      description
      image {
        localFile {
          childImageSharp {
            data: gatsbyImageData(
              width: 2048
              formats: [AUTO, WEBP]
              quality: 50
              placeholder: BLURRED
            )
          }
          publicURL
        }
        description
        # url
      }
      variants {
        id
        sku
        featuredImage {
          localFile {
            childImageSharp {
              data: gatsbyImageData(
                width: 2048
                formats: [AUTO, WEBP]
                quality: 50
                placeholder: BLURRED
              )
            }
          }
        }
        featuredImageClear {
          localFile {
            childImageSharp {
              data: gatsbyImageData(
                width: 2048
                formats: [AUTO, WEBP]
                quality: 50
                placeholder: BLURRED
              )
            }
          }
        }
        colorName
        colorImage {
          localFile {
            childImageSharp {
              data: gatsbyImageData(width: 40)
            }
          }
        }
        frameColor
        dominantFrameColor
        product {
          handle
          title
          frameWidth
        }
      }
    }
    shopifyCollection(handle: { eq: $handle }) {
      products {
        title
        handle
        createdAt
        tags
        variants {
          legacyResourceId
          price
          compareAtPrice
          sku
          metafields {
            key
            namespace
            value
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    contentfulHomepage {
      enableBogo
    }
  }
`

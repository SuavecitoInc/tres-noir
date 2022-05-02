import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Product from "../components/product"
import { ShopifyCollection, ShopifyProduct } from "../types/shopify"
import { GatsbyImage } from "gatsby-plugin-image"
import FreeShipping from "../components/free-shipping"

const Page = styled.section`
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    @media screen and (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      padding: 0;
    }
    @media screen and (min-width: 601px) and (max-width: 1023px) {
      grid-template-columns: repeat(3, 1fr);
      padding: 0 10px;
    }
    grid-template-rows: auto;
    gap: 40px 30px;
    margin: 40px 0;
    padding: 0 22px;
    margin-bottom: 55px;
  }
  .image-container {
    position: relative;
    .top-right {
      max-width: 350px;
      padding: 10px;
      position: absolute;
      top: 8px;
      right: 16px;
      color: white;
      h1 {
        font-weight: normal;
        text-transform: uppercase;
        font-size: 2rem;
        margin-bottom: 8px;
      }
      p {
        font-family: var(--sub-heading-font);
      }
    }
  }
  .collection-image {
    margin: 0 -15px;
    height: 435px;
    @media screen and (max-width: 600px) {
      height: 300px;
    }
  }
`

const Collection = ({
  data,
}: {
  data: {
    shopifyCollection: ShopifyCollection
    contentfulShopifyCollectionImages
  }
}) => {
  const {
    shopifyCollection: collection,
    contentfulShopifyCollectionImages: collectionImages,
  } = data
  const collectionSize = collection.products.length

  return (
    <Layout>
      <SEO title={collection.title} />
      <FreeShipping />
      <Page>
        <div className="container">
          <div className="image-container">
            <div>
              <GatsbyImage
                className="collection-image"
                image={collectionImages.collectionImageTop?.gatsbyImageData}
                alt={collectionImages.collectionImageTop?.title}
              />
            </div>
            <div className="top-right">
              <h1>{collection.title}</h1>
              <p>{collectionImages.description}</p>
            </div>
          </div>
          <div className="grid">
            {collection.products.slice(0, 8).map((product: ShopifyProduct) => (
              <Product key={product.handle} data={product} />
            ))}
          </div>
          <div className="image-container">
            <div>
              <GatsbyImage
                className="collection-image"
                image={collectionImages.collectionImageMiddle?.gatsbyImageData}
                alt={collectionImages.collectionImageMiddle?.title}
              />
            </div>
          </div>
          <div className="grid">
            {collectionSize >= 8 &&
              collection.products
                .slice(8, collectionSize)
                .map((product: ShopifyProduct) => (
                  <Product key={product.handle} data={product} />
                ))}
          </div>
        </div>
      </Page>
    </Layout>
  )
}

export default Collection

export const query = graphql`
  query CollectionQuery($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      handle
      id
      title
      products {
        handle
        featuredImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 275
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        priceRangeV2 {
          minVariantPrice {
            amount
          }
          maxVariantPrice {
            amount
          }
        }
        productType
        storefrontId
        title
        variants {
          title
        }
      }
    }
    contentfulShopifyCollectionImages(handle: { eq: $handle }) {
      description
      collectionImageTop {
        gatsbyImageData
        title
      }
      collectionImageMiddle {
        gatsbyImageData
        title
      }
      name
    }
  }
`

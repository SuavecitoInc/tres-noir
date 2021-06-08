import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Product from "../components/product"
import { Data, ShopifyProduct } from "../types/shopify-products"

const Collection = ({ data }: Data) => {
  const { shopifyCollection: collection } = data
  return (
    <Layout>
      <SEO title={collection.title} />
      <Page>
        <h1>{collection.title}</h1>
        <div className="grid">
          {collection.products.map((product: ShopifyProduct) => (
            <Product key={product.handle} data={product} />
          ))}
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
        images {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 200
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
          }
          maxVariantPrice {
            amount
          }
        }
        productType
        shopifyId
        title
      }
    }
  }
`

const Page = styled.div`
  .grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`

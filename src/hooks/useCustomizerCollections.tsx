import { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import type { AvailablePath, Product } from "../contexts/customizer/types"

const MERGE_SAME_PRICE = true

const patchSamePrice = (path: AvailablePath) => {
  const patchedProducts = path?.products?.map(p => {
    const variants = p.variants
    const isSamePrice = variants.every(
      v => v.price === variants[0].price && MERGE_SAME_PRICE
    )
    return { ...p, isSamePrice } as Product
  })
  return { ...path, products: patchedProducts }
}

export const useCustomizerCollections = () => {
  const { nonPrescription, singleVision, readers, bifocal, progressive } =
    useStaticQuery(graphql`
      query CustomizerQuery {
        nonPrescription: shopifyCollection(handle: { eq: "non-prescription" }) {
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
        singleVision: shopifyCollection(handle: { eq: "single-vision" }) {
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
        readers: shopifyCollection(handle: { eq: "readers" }) {
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
        bifocal: shopifyCollection(handle: { eq: "bifocal" }) {
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
        progressive: shopifyCollection(handle: { eq: "progressive" }) {
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

  return useMemo(
    () => ({
      nonPrescription: patchSamePrice(nonPrescription),
      singleVision: patchSamePrice(singleVision),
      readers: patchSamePrice(readers),
      bifocal: patchSamePrice(bifocal),
      progressive: patchSamePrice(progressive),
    }),
    [nonPrescription, singleVision, readers, bifocal, progressive]
  )
}
export default useCustomizerCollections

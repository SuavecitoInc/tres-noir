import { useStaticQuery, graphql } from "gatsby"

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

  return {
    nonPrescription,
    singleVision,
    readers,
    bifocal,
    progressive,
  }
}
export default useCustomizerCollections

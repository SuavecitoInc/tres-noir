import { useStaticQuery, graphql } from "gatsby"
import type { AvailablePath, Product } from "../contexts/customizer/types"
import useCollectionDiscountedPricing from "../hooks/useCollectionDiscountedPricing"

const MERGE_SAME_PRICE = true

type DiscountedPrice = {
  id: string
  discountedPrice: number
  offer: string
}

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

const getPricing = (path: AvailablePath) => {
  return path?.products
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
}

const patchDiscountedPricing = (
  path: AvailablePath,
  discountedPrices: DiscountedPrice[]
) => {
  const tempCollection = JSON.parse(JSON.stringify(path))
  const patchedProducts = tempCollection.products.map(p => {
    const patchedVariants = p.variants.map(v => {
      // console.log("v in patchDiscountedPricing", v)
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

  // get pricing for each collection
  const nonPrescriptionPricing = getPricing(nonPrescription)
  const singleVisionPricing = getPricing(singleVision)
  const readersPricing = getPricing(readers)
  const bifocalPricing = getPricing(bifocal)
  const progressivePricing = getPricing(progressive)

  const prices = [
    ...nonPrescriptionPricing,
    ...singleVisionPricing,
    ...readersPricing,
    ...bifocalPricing,
    ...progressivePricing,
  ]
  // dummy handle
  const handle = "customizer"

  const { offer, isApplicable, discountedPrices } =
    useCollectionDiscountedPricing({ prices, handle })

  // patch pricing with discounted pricing

  const patchedNonPrescription = isApplicable
    ? patchDiscountedPricing(nonPrescription, discountedPrices)
    : nonPrescription

  const patchedSingleVision = isApplicable
    ? patchDiscountedPricing(singleVision, discountedPrices)
    : singleVision

  const patchedReaders = isApplicable
    ? patchDiscountedPricing(readers, discountedPrices)
    : readers

  const patchedBifocal = isApplicable
    ? patchDiscountedPricing(bifocal, discountedPrices)
    : bifocal

  const patchedProgressive = isApplicable
    ? patchDiscountedPricing(progressive, discountedPrices)
    : progressive

  return {
    nonPrescription: patchSamePrice(patchedNonPrescription),
    singleVision: patchSamePrice(patchedSingleVision),
    readers: patchSamePrice(patchedReaders),
    bifocal: patchSamePrice(patchedBifocal),
    progressive: patchSamePrice(patchedProgressive),
  }

  // return {
  //   nonPrescription,
  //   singleVision,
  //   readers,
  //   bifocal,
  //   progressive,
  // }
}
export default useCustomizerCollections

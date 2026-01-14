import { useStaticQuery, graphql } from "gatsby"

type ContentfulDiscount = {
  identifier: string
  enable: boolean
  overwriteLabel: boolean
}

export type DiscountConfig = {
  discountIdentifier: string
  enableDiscountIdentifier: boolean
  overwriteLabel: boolean
}

export const useDiscountIdentifier = () => {
  const data = useStaticQuery(graphql`
    query getContenfulDiscountSettings {
      contentfulHomepage {
        discountIdentifier
        enableDiscountIdentifier
        availableDiscounts {
          identifier
          enable
          overwriteLabel
        }
      }
    }
  `)

  const discounts = data.contentfulHomepage.availableDiscounts.map(
    (discount: ContentfulDiscount) => {
      return {
        discountIdentifier:
          discount.identifier.toUpperCase() === "NONE"
            ? ""
            : discount.identifier,
        enableDiscountIdentifier: discount.enable,
        overwriteLabel: discount.overwriteLabel,
      }
    }
  )

  return discounts as DiscountConfig[]
}

export default useDiscountIdentifier

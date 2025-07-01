import { useStaticQuery, graphql } from "gatsby"

export const useDiscountIdentifier = () => {
  const data = useStaticQuery(graphql`
    query getContenfulDiscountSettings {
      contentfulHomepage {
        discountIdentifier
        enableDiscountIdentifier
      }
    }
  `)
  const identifier =
    data.contentfulHomepage.discountIdentifier.toUpperCase() === "NONE"
      ? ""
      : data.contentfulHomepage.discountIdentifier
  return {
    discountIdentifier: identifier,
    enableDiscountIdentifier: data.contentfulHomepage
      .enableDiscountIdentifier as boolean,
    overwriteLabel: true,
  }
}

export default useDiscountIdentifier

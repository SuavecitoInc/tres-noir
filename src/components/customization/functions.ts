import { Dispatch, SetStateAction } from "react"
import { SelectedVariants } from "../../types/global"

export const changeImage = (
  currentStep: number,
  selectedCollectionPathTitle: string,
  selectedVariants: any,
  setCurrentImage: Dispatch<SetStateAction<any>>,
  variant: any
) => {
  const { step1 } = selectedVariants
  const defaultImage =
    variant.contentful.customizations?.clear?.localFile?.childImageSharp
      ?.data ??
    variant.contentful.featuredImage?.localFile?.childImageSharp?.data
  const defaultTitle =
    variant.contentful.customizations?.clear?.title ??
    variant.contentful.featuredImage.title

  const isBifocal = selectedCollectionPathTitle === "Bifocal"
  const isSafetyGlasses =
    variant.shopify.product.productType === "Safety Glasses"

  try {
    switch (currentStep) {
      case 0:
        if (isSafetyGlasses) {
          const step0Property = "clear"
          setCurrentImage({
            data: variant.contentful.customizations[step0Property].localFile
              .childImageSharp.data,
            altText: variant.contentful.customizations[step0Property].title,
          })
          break
        } else {
          switch (selectedCollectionPathTitle) {
            case "Non-Prescription":
            case "Single Vision":
            case "Readers":
            case "Progressive":
              const step0Property = "clear"
              setCurrentImage({
                data: variant.contentful.customizations[step0Property].localFile
                  .childImageSharp.data,
                altText: variant.contentful.customizations[step0Property].title,
              })
              break
            case "Bifocal":
              const step0BifocalProperty = "bifocal"
              setCurrentImage({
                data: variant.contentful.customizations[step0BifocalProperty]
                  .localFile.childImageSharp.data,
                altText:
                  variant.contentful.customizations[step0BifocalProperty].title,
              })
              break
          }
        }

        break
      case 1:
        const variantTitle = selectedVariants.step1.title
        // remove prefix
        let strippedProductTitle = step1.product.title.replace(
          `${selectedCollectionPathTitle} - `,
          ""
        ) // remove prefix
        switch (strippedProductTitle) {
          // Clear
          case "Clear":
          case "Blue Light Blocking":
            const property = isBifocal ? "bifocal" : "clear"
            setCurrentImage({
              data: variant.contentful.customizations[property].localFile
                .childImageSharp.data,
              altText: variant.contentful.customizations[property].title,
            })
            break
          // Sunglasses
          case "Sunglasses": // this doesn't exist or rename collection to sunglasses
          case "Sun":
          case "Transitions":
          case "Transitions - For Progressive":
          case "XTRActive Polarized":
          case "Polarized - For Non Prescription":
          case "Non Prescription Polarized Lenses":
          case "Polarized": {
            const property = isBifocal
              ? `sunGlasses${variantTitle}LensesBifocal`
              : `sunGlasses${variantTitle}Lenses`
            setCurrentImage({
              data: variant.contentful.customizations[property].localFile
                .childImageSharp.data,
              altText: variant.contentful.customizations[property].title,
            })
            break
          }
          // Gradient Tint
          case "Gradient":
          case "Gradient Tint": {
            const property = isBifocal
              ? `bifocalGradientTint${variantTitle}Lenses`
              : `gradientTint${variantTitle}Lenses`
            setCurrentImage({
              data: variant.contentful.customizations[property].localFile
                .childImageSharp.data,
              altText: variant.contentful.customizations[property].title,
            })
            break
          }
        }
        break
      case 3:
        break
      case 4:
        break
      case 5:
        break
      default:
        break
    }
  } catch (error) {
    setCurrentImage({
      data: defaultImage,
      altText: defaultTitle,
    })
  }
}

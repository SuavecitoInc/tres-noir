import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import type { Product, Variant } from "../../../contexts/customizer/types"
import { isDiscounted, formatPrice } from "../../../helpers/shopify"

type ProductOptionProps = {
  product: Product
  currentCollection: { title: string }
  currentStep: number
  selectedVariants: any
  handleChange: (
    evt: React.ChangeEvent<HTMLInputElement> | null,
    variant: Variant,
    isSetFromEvent?: boolean
  ) => void
}

const ProductOption: React.FC<ProductOptionProps> = ({
  product,
  currentCollection,
  currentStep,
  selectedVariants,
  handleChange,
}) => {
  // fix variant.image is null
  if (product.variants[0].image === null && product.media[0]?.image) {
    product.variants[0].image = {
      ...product.media[0].image,
      originalSrc: product.media[0].image.originalSrc || "",
      altText: product.media[0].image.altText || "",
    }
  }

  const isSingleVariantProduct =
    product.variants.length === 1 &&
    product.variants[0].title.includes("Default")

  if (isSingleVariantProduct) {
    return (
      <div className={`product-option`}>
        <GatsbyImage
          image={
            product.image && product.image.localFile
              ? product.image.localFile.childImageSharp.gatsbyImageData
              : product.media[0].image.localFile.childImageSharp.gatsbyImageData
          }
          alt={product.media[0].image.altText || product.title}
        />
        <div className="product-description">
          <h4>
            {product.title.replace(`${currentCollection.title} - `, "")}{" "}
            <span className="price">
              {` + $${formatPrice(product.variants[0].price)}`}
              {!!product.variants[0]?.compareAtPrice &&
                isDiscounted(
                  product.variants[0].price,
                  product.variants[0].compareAtPrice
                ) && (
                  <span>
                    {" "}
                    <span className="strikethrough-grey">
                      ${formatPrice(product.variants[0].compareAtPrice as any)}
                    </span>
                  </span>
                )}
            </span>
          </h4>
          <p>{product.description}</p>
        </div>

        <input
          type="radio"
          name={`step${currentStep}`}
          id={product.id}
          aria-label={product.title}
          onChange={evt => handleChange(evt, product.variants[0])}
          checked={
            product.variants[0].storefrontId ===
            selectedVariants[`step${currentStep}`].storefrontId
          }
        />
        <div className="checkmark" />
      </div>
    )
  }

  return (
    <div className={`product-option with-variants`}>
      <GatsbyImage
        image={
          product.image && product.image.localFile
            ? product.image.localFile.childImageSharp.gatsbyImageData
            : product.media[0].image.localFile.childImageSharp.gatsbyImageData
        }
        alt={product.media[0].image.altText || product.title}
      />
      <div className="product-description">
        <h4>
          {product.title.replace(`${currentCollection.title} - `, "")}{" "}
          {
            // @ts-expect-error - update type
            product.isSamePrice && (
              <span className="price">
                {` + $${formatPrice(product.variants[0].price)}`}
                {!!product.variants[0]?.compareAtPrice &&
                  isDiscounted(
                    product.variants[0].price,
                    product.variants[0].compareAtPrice
                  ) && (
                    <span>
                      {" "}
                      <span className="strikethrough-grey">
                        $
                        {formatPrice(product.variants[0].compareAtPrice as any)}
                      </span>
                    </span>
                  )}
              </span>
            )
          }
        </h4>
        <p>{product.description}</p>
      </div>
      <ul className="variants">
        {product.variants.map((variant: Variant) => (
          <li key={variant.storefrontId}>
            <GatsbyImage
              image={variant.image.localFile.childImageSharp.gatsbyImageData}
              alt={variant.title}
              className="variant-image"
            />
            <div className="variant-description">
              <h6>
                {variant.title}
                {
                  // @ts-expect-error - update type
                  !product.isSamePrice && (
                    <span className="price">
                      {` + $${variant.price}`}
                      {isDiscounted(variant.price, variant.compareAtPrice) && (
                        <span>
                          {" "}
                          <span className="strikethrough-grey">
                            ${variant.compareAtPrice}
                          </span>
                        </span>
                      )}
                    </span>
                  )
                }
              </h6>
            </div>
            <input
              type="radio"
              name={`step${currentStep}`}
              id={product.id}
              aria-label={product.title}
              onChange={evt => handleChange(evt, variant)}
              checked={
                variant.storefrontId ===
                selectedVariants[`step${currentStep}`].storefrontId
              }
            />
            <div className="checkmark" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductOption

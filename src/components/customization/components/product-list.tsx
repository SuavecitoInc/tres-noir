import React from "react"
import ProductOption from "./product-option"
import type { Product, Variant } from "../../../contexts/customizer/types"

type ProductListProps = {
  products: Product[]
  currentCollection: { title: string }
  currentStep: number
  selectedVariants: any
  handleChange: (
    evt: React.ChangeEvent<HTMLInputElement> | null,
    variant: Variant,
    isSetFromEvent?: boolean
  ) => void
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  currentCollection,
  currentStep,
  selectedVariants,
  handleChange,
}) => {
  if (!products) return null

  return (
    <>
      {products.map((product: Product) => (
        <React.Fragment key={product.id}>
          <ProductOption
            product={product}
            currentCollection={currentCollection}
            currentStep={currentStep}
            selectedVariants={selectedVariants}
            handleChange={handleChange}
          />
        </React.Fragment>
      ))}
    </>
  )
}

export default ProductList

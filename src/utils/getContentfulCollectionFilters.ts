import type {
  ContentfulProduct,
  ContentfulProductVariant,
} from "../types/contentful"

export const getFilters = (products: ContentfulProduct[]) => {
  // get fit type
  let frameWidthList: string[] = []
  products.forEach(product => {
    if (product.frameWidth)
      product.frameWidth.forEach((frameWidth: string) => {
        if (!frameWidthList.includes(frameWidth))
          frameWidthList.push(frameWidth)
      })
  })
  // order sizes
  const order = ["small", "medium", "large", "x-large"]

  frameWidthList.sort((a, b) => {
    return order.indexOf(a) - order.indexOf(b)
  })

  // get colors
  let colorsList: string[] = []
  products.forEach(product =>
    product.variants.forEach(variant => {
      variant.frameColor.forEach(color => {
        if (!colorsList.includes(color)) colorsList.push(color)
      })
    })
  )
  colorsList = colorsList.filter((v, i) => colorsList.indexOf(v) === i)
  // return values
  return {
    frameWidthList: frameWidthList,
    colorsList: colorsList.sort(),
  }
}

export const getVariantFilters = (variants: ContentfulProductVariant[]) => {
  // get fit type
  let frameWidthList: string[] = []
  variants.forEach(variant => {
    if (variant.product[0].frameWidth)
      variant.product[0].frameWidth.forEach((frameWidth: string) => {
        if (!frameWidthList.includes(frameWidth))
          frameWidthList.push(frameWidth)
      })
  })
  // order sizes
  const order = ["small", "medium", "large", "x-large", "one size fits all"]

  frameWidthList.sort((a, b) => {
    return order.indexOf(a) - order.indexOf(b)
  })

  // get colors
  let colorsList: string[] = []
  variants.forEach(variant =>
    variants.forEach(variant => {
      variant.frameColor.forEach(color => {
        if (!colorsList.includes(color)) colorsList.push(color)
      })
    })
  )
  colorsList = colorsList.filter((v, i) => colorsList.indexOf(v) === i)
  // return values
  return {
    frameWidthList: frameWidthList,
    colorsList: colorsList.sort(),
  }
}

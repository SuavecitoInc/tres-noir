import { useEffect, useState } from "react"

import { useCart } from "../contexts/storefront-cart"
import type { DiscountConfig } from "./useDiscountIdentifier"
import useDiscountIdentifier from "./useDiscountIdentifier"

type Params = {
  productId: string
  prices: { id: string; price: number }[]
  selectedVariantId: string
  handle: string
}

export const useDiscountedPricing = ({
  productId,
  prices,
  selectedVariantId,
  handle,
}: Params) => {
  const [discountedPrices, setDiscountedPrices] = useState<
    {
      id: string
      discountedPrice: number
      offer: string
    }[]
  >([])
  const [isApplicable, setIsApplicable] = useState(false)
  // cart
  const { getAppliedDiscountCode } = useCart()
  const discounts: DiscountConfig[] = useDiscountIdentifier()
  const abortController = new AbortController()

  const found = discountedPrices.find(p => p.id === selectedVariantId) ?? null

  // on mount
  useEffect(() => {
    const fetchDiscountedPricing = async (discount: DiscountConfig) => {
      try {
        let offer = ""
        if (discount.enableDiscountIdentifier) {
          offer = discount.discountIdentifier
        } else {
          offer = getAppliedDiscountCode()
        }

        // get URL params
        if (!offer || offer === "") return

        const res = await fetch("/api/getDiscountedPricing", {
          method: "POST",
          body: JSON.stringify({
            productId,
            offer,
            prices,
            handle,
            overwriteLabel: discount.overwriteLabel,
          }),
          signal: abortController.signal,
        })
        const json = await res.json()
        if (res.ok) {
          setDiscountedPrices(discountedPrices => [
            ...discountedPrices,
            ...json.prices,
          ])
          setIsApplicable(true)
        }
      } catch (error) {}
    }
    if (discounts.length === 0) return
    discounts.forEach(discount => {
      if (!discount.enableDiscountIdentifier) return
      fetchDiscountedPricing(discount)
    })
    return () => {
      abortController.abort()
    }
  }, [getAppliedDiscountCode])

  return {
    isApplicable:
      isApplicable && discountedPrices.some(p => p.id === selectedVariantId),
    discountedPrice: found ? found.discountedPrice : null,
    offer: found ? found.offer : "Sale",
  }
}

export default useDiscountedPricing

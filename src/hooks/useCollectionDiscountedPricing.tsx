import { useEffect, useState } from "react"

import { useCart } from "../contexts/storefront-cart"
import type { DiscountConfig } from "./useDiscountIdentifier"
import useDiscountIdentifier from "./useDiscountIdentifier"

type Params = {
  prices: { id: string; price: number }[]
  handle: string
}

export const useCollectionDiscountedPricing = ({ prices, handle }: Params) => {
  const [discountedPrices, setDiscountedPrices] = useState<
    {
      id: string
      discountedPrice: number
      offer: string
    }[]
  >([])
  const [isApplicable, setIsApplicable] = useState(false)
  const [offer, setOffer] = useState("")
  // cart
  const { getAppliedDiscountCode } = useCart()
  const discounts: DiscountConfig[] = useDiscountIdentifier()
  const abortController = new AbortController()

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

        const res = await fetch("/api/getCollectionDiscountedPricing", {
          method: "POST",
          body: JSON.stringify({
            offer,
            prices,
            handle,
            overwriteLabel: discount.overwriteLabel,
          }),
          signal: abortController.signal,
          cache: "force-cache",
        })
        const json = await res.json()
        if (res.ok && json.prices && json.prices.length > 0) {
          setDiscountedPrices(discountedPrices => [
            ...discountedPrices,
            ...json.prices,
          ])
          setIsApplicable(true)
          setOffer(discounts.length > 1 ? "Sale" : offer) // not used anymore, but kept for backward compatibility
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
    isApplicable,
    offer,
    discountedPrices,
  }
}

export default useCollectionDiscountedPricing

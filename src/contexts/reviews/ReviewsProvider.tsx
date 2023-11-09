import React, {
  useState,
  useMemo,
  ReactNode,
  useCallback,
  useEffect,
} from "react"
import { ReviewsContext } from "./context"
import {
  YotpoRetrieveReviewsData,
  YotpoRetrieveReviewsResponse,
} from "../../types/yotpo"

type Props = {
  productId: string
  children: ReactNode | ReactNode[]
}

export function ReviewsProvider({ productId, children }: Props) {
  const [data, setData] = useState<YotpoRetrieveReviewsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getReviewsForProduct = async (productId: string) => {
      try {
        setIsLoading(true)
        const YOTPO_APP_KEY = process.env.GATSBY_YOTPO_APP_KEY as string
        const url = `https://api-cdn.yotpo.com/v1/widget/${YOTPO_APP_KEY}/products/${productId}/reviews.json`

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        const json = (await response.json()) as YotpoRetrieveReviewsData
        if (json.status.code !== 200) {
          throw Error(JSON.stringify(json.status))
        }
        console.log("json", json)
        setData(json.response)
        setIsLoading(false)
        return json
      } catch (error) {
        console.error("Error fetching reviews for product", error)
      }
    }
    getReviewsForProduct(productId)
  }, [])

  const mutateReviewThumbVote = ({
    vote,
    reviewId,
  }: {
    vote: "up" | "down"
    reviewId: number
  }) => {
    try {
      const url = `http://api.yotpo.com/reviews/${reviewId}/vote/${vote}`
      console.log("ENDPOINT IS", url)
    } catch (error) {
      console.error("Error")
    }
  }

  const reviewsContextValue = useMemo(
    () => ({ data, isLoading, mutateReviewThumbVote }),
    [data, isLoading]
  )

  return (
    <ReviewsContext.Provider value={reviewsContextValue}>
      {children}
    </ReviewsContext.Provider>
  )
}

export default ReviewsProvider

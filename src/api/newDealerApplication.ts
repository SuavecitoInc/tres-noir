import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import fetch from "node-fetch"
import * as crypto from "crypto"
interface FormData {
  subsidiary: number
  storeName: string
  email: string
  storeTel: string
  address: string
  address2?: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
  ownerFirstName: string
  ownerLastName: string
  authorizedBuyerFirstName: string
  authorizedBuyerLastName: string
  businessType: string
  question1: string
  averageRetailPrice: string
  brand1: string
  brand2: string
  brand3: string
  question4: string
  question5: string
  question6: string
  date: string
}

// type NetSuiteLeadResponse = {
//   success: boolean
//   data: {
//     id: number
//   } | null
//   error?: null | string
// }

// create a function to create an hmac sha256 hash
function createHmacSha256Hash(data: string): string {
  // const secret = process.env.SECRET_KEY as string
  const secret = process.env.SUPER_SECRET as string
  if (!secret) {
    throw new Error("SUPER_SECRET is not defined")
  }
  const hmac = crypto.createHmac("sha256", secret).update(data).digest("base64")
  return hmac
}

async function createNetSuiteLead(data: FormData) {
  const endpoint = process.env.API_ENDPOINT as string

  // patch data with subsidiary
  data.subsidiary = 5

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Suavecito-Hmac-Sha256": createHmacSha256Hash(JSON.stringify(data)),
    },
    body: JSON.stringify(data),
  })

  const responseJson = (await response.json()) as { id: number }
  console.log("Response from NetSuite lead endpoint:", responseJson)

  return responseJson
}

export default async function newDealerApplication(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const { body } = req
    console.log("Request body:", body)
    if (!body) {
      throw new Error("No body found")
    }

    const response = await createNetSuiteLead(body as FormData)

    if (!response.id) {
      console.log("Error creating lead, no ID returned:", response)
      return res.status(403).json({ error: "Error creating lead" })
    }

    res.status(200).json({ message: "ok" })
  } catch (error) {
    console.log("Error Creating Lead:", error)
    res.status(500).json({ error: "Error creating Lead" })
  }
}

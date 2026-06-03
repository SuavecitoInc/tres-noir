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
function createHmacSha256Hash(secret: string, data: string): string {
  if (!secret) {
    throw new Error("Secret key is not defined")
  }
  const hmac = crypto.createHmac("sha256", secret).update(data).digest("base64")
  return hmac
}

async function createDealerApplicationPDF(data: FormData) {
  const secret = process.env.SECRET_KEY as string
  const endpoint = process.env.TN_DEALER_APPLICATION_ENDPOINT as string

  const patchedData = {
    ...data,
    // pdf generator expects these fields to be called "owners" and "authorizedBuyer"
    owners: `${data.ownerFirstName} ${data.ownerLastName}`,
    authorizedBuyerContact: `${data.authorizedBuyerFirstName} ${data.authorizedBuyerLastName}`,
  }

  const body = JSON.stringify(patchedData)
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Tres-Noir-Hmac-Sha256": createHmacSha256Hash(secret, body),
    },
    body: body,
  })

  const responseJson: any = await response.json()
  console.log("Response from endpoint:", responseJson)
  if (responseJson.error) {
    console.log("Error from endpoint:", responseJson.error)
    return { success: false, error: responseJson.error }
  }

  return { success: true, data: responseJson }
}

async function createNetSuiteLead(data: FormData) {
  const secret = process.env.SUPER_SECRET as string
  const endpoint = process.env.API_ENDPOINT as string

  // patch data with subsidiary
  data.subsidiary = 5

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Suavecito-Hmac-Sha256": createHmacSha256Hash(
        secret,
        JSON.stringify(data)
      ),
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

    // uncomment to re-enable PDF generation, but be aware that it will slow down the response time significantly
    // (this can be moved to the queue to run as a background service)
    // await createDealerApplicationPDF(body as FormData)

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

// api/create-staged-upload.ts
import fetch from "node-fetch"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    console.log("Received request body:", req.body)
    const { fileName, mimeType, fileSize } = req.body as {
      fileName: string
      mimeType: string
      fileSize: number
    }

    const endpoint = `https://${process.env.GATSBY_STORE_MY_SHOPIFY}/admin/api/${process.env.GATSBY_SHOPIFY_API_VERSION}/graphql.json`

    const stagedUploadResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": process.env.GATSBY_STORE_TOKEN as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `#graphql
          mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
            stagedUploadsCreate(input: $input) {
              stagedTargets {
                url
                resourceUrl
                parameters {
                  name
                  value
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          input: [
            {
              resource: "FILE",
              filename: fileName,
              mimeType: mimeType,
              httpMethod: "POST",
              fileSize: fileSize.toString(),
            },
          ],
        },
      }),
    })

    const data: any = await stagedUploadResponse.json()

    console.log("Staged Upload Response:", JSON.stringify(data, null, 2))

    if (data.data.stagedUploadsCreate.userErrors.length > 0) {
      throw new Error(data.data.stagedUploadsCreate.userErrors[0].message)
    }

    const stagedTarget = data.data.stagedUploadsCreate.stagedTargets[0]

    return res.status(200).json({
      uploadUrl: stagedTarget.url,
      resourceUrl: stagedTarget.resourceUrl,
      parameters: stagedTarget.parameters,
    })
  } catch (error: any) {
    console.error("Error creating staged upload:", error)
    return res.status(500).json({
      error: "Failed to create staged upload",
      details: error.message,
    })
  }
}

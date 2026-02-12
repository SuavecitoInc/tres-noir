// Not Currently Used
import fetch from "node-fetch"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

// Helper to wait
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { resourceId, resourceUrl, fileName } = req.body as {
      resourceId: string
      resourceUrl: string
      fileName: string
    }

    const endpoint = `https://${process.env.GATSBY_STORE_MY_SHOPIFY}/admin/api/${process.env.GATSBY_SHOPIFY_API_VERSION}/graphql.json`

    // Create the file
    const fileUpdateResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": process.env.GATSBY_STORE_TOKEN as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation fileUpdate($files: [FileUpdateInput!]!) {
            fileUpdate(files: $files) {
              files {
                ... on MediaImage {
                  id
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
          files: [
            {
              id: resourceId,
              alt: fileName,
              // contentType: "IMAGE",
              // originalSource: resourceUrl,
              previewImageSource: resourceUrl,
            },
          ],
        },
      }),
    })

    const data: any = await fileUpdateResponse.json()
    console.log("File Create Response:", JSON.stringify(data, null, 2))

    if (data.data.fileUpdate.userErrors.length > 0) {
      throw new Error(data.data.fileUpdate.userErrors[0].message)
    }

    const fileId = data.data.fileUpdate.files[0].id

    // Poll until the file is ready (with timeout)
    let fileUrl = null
    const maxAttempts = 10
    const delayMs = 1000

    for (let i = 0; i < maxAttempts; i++) {
      await sleep(delayMs)

      const fileQueryResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": process.env.GATSBY_STORE_TOKEN as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query getFile($id: ID!) {
              node(id: $id) {
                ... on MediaImage {
                  id
                  image {
                    url
                  }
                }
              }
            }
          `,
          variables: {
            id: fileId,
          },
        }),
      })

      const queryData: any = await fileQueryResponse.json()

      console.log(`Poll attempt ${i + 1}:`, JSON.stringify(queryData, null, 2))

      fileUrl = queryData.data.node?.image?.url

      if (fileUrl) {
        console.log("File is ready! URL:", fileUrl)
        break
      }

      console.log(`File not ready yet, waiting ${delayMs}ms...`)
    }

    if (!fileUrl) {
      throw new Error("File processing timed out")
    }

    return res.status(200).json({
      success: true,
      fileUrl,
      fileName,
      fileId,
    })
  } catch (error: any) {
    console.error("Error finalizing file:", error)
    return res.status(500).json({
      error: "Failed to finalize file",
      details: error.message,
    })
  }
}

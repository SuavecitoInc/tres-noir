// api/finalize-file.ts
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
    const { fileID } = req.body as {
      fileID: string
    }

    const endpoint = `https://${process.env.GATSBY_STORE_MY_SHOPIFY}/admin/api/${process.env.GATSBY_SHOPIFY_API_VERSION}/graphql.json`

    // Create the file
    const fileDeleteResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": process.env.GATSBY_STORE_TOKEN as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `#graphql
          mutation fileDelete($fileIds: [ID!]!) {
            fileDelete(fileIds: $fileIds) {
              deletedFileIds
              userErrors {
                field
                message
                code
              }
            }
          }
        `,
        variables: {
          fileIds: [fileID],
        },
      }),
    })

    const data: any = await fileDeleteResponse.json()
    console.log("File Delete Response:", JSON.stringify(data, null, 2))

    if (data.data.fileDelete.userErrors.length > 0) {
      throw new Error(data.data.fileDelete.userErrors[0].message)
    }

    const deletedFileId = data.data.fileDelete.deletedFileIds[0]

    if (!deletedFileId) {
      throw new Error("File deletion failed.")
    }

    return res.status(200).json({
      success: true,
      deletedFileId,
    })
  } catch (error: any) {
    console.error("Error deleting file:", error)
    return res.status(500).json({
      error: "Failed to delete file",
      details: error.message,
    })
  }
}

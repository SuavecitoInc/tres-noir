import { useState } from "react"
import { useErrorModal } from "../contexts/error-modal"

export const useConfirmPrescription = (
  orderId: string,
  frameIdentifier: string
) => {
  const { renderErrorModal } = useErrorModal()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)

  const fetchMostCurrentOrderNote = async (orderId: string) => {
    try {
      const endpoint = "/api/getCurrentOrderNote"
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          id: orderId,
        }),
      })
      if (!res.ok) {
        throw new Error("Failed to fetch current order note.")
      }
      const resJson = await res.json()
      return resJson.order.note
    } catch (error) {
      console.error("Error while fetching most current order note", error)
      renderErrorModal()
    }
  }

  const markMetafieldAsTrue = async () => {
    try {
      const endpoint = "/api/updateReminderMetafield"
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          id: orderId,
        }),
      })
      if (!res.ok) {
        throw new Error("Failed to update reminder metafield.")
      }
      const resJson = await res.json()
      return resJson
    } catch (error) {
      console.error("Error while fetching most current order note", error)
      renderErrorModal()
    }
  }

  const updateOrderNote = async (url: string) => {
    let newNote: string = ""
    const currentNote = await fetchMostCurrentOrderNote(orderId)
    if (currentNote === "" || !currentNote) {
      newNote = ""
    } else if (!currentNote.endsWith("\n")) {
      newNote = currentNote + "\n"
    } else {
      newNote = currentNote
    }
    if (url !== "") {
      newNote += frameIdentifier + url + "\n"
    } else {
      newNote += frameIdentifier + "confirmed" + "\n"
    }
    try {
      const endpoint = "/api/addOrderNote"
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          note: newNote,
          id: orderId,
        }),
      })
      if (res.ok) {
        setShowSuccess(true)
      } else {
        // must've been an error
        renderErrorModal()
      }
    } catch (error) {
      console.error("Error while calling uploadOrderNote", error)
      renderErrorModal()
    }
  }

  const handleUploadPrescription = async () => {
    try {
      console.log("Handle Shopify Reupload ->Selected file:", selectedFile)
      if (!selectedFile) {
        return
      }
      setShowLoader(true)
      // step 1: Get staged upload URL from your backend
      const stageResponse = await fetch("/api/createStagedUpload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: selectedFile.name,
          mimeType: selectedFile.type,
          fileSize: selectedFile.size,
        }),
      })

      if (!stageResponse.ok) {
        throw new Error("Failed to create staged upload.")
      }

      const { uploadUrl, resourceUrl, parameters } = await stageResponse.json()

      // step 2: Upload file DIRECTLY to Shopify (no size limit!)
      const formData = new FormData()

      // add Shopify's parameters first
      parameters.forEach(param => {
        formData.append(param.name, param.value)
      })

      // add the actual file
      formData.append("file", selectedFile)

      await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      })

      // step 3: Finalize the file in Shopify
      const finalizeResponse = await fetch("/api/finalizeUpload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceUrl,
          fileName: selectedFile.name,
        }),
      })

      if (!finalizeResponse.ok) {
        throw new Error("Failed to finalize upload.")
      }

      // fileUrl, fileId, fileName
      const { fileUrl, fileId } = await finalizeResponse.json()

      console.log("File uploaded to Shopify:", fileUrl)
      if (fileUrl) {
        setShowLoader(false)
        setShowSuccess(true)
        await updateOrderNote(fileUrl)
        await markMetafieldAsTrue()
        // isNowValid()
      } else {
        throw new Error("File URL not returned from finalize upload.")
      }
    } catch (error: any) {
      console.error("Upload failed:", error)
      setShowLoader(false)
    }
  }

  const handleUpdateUploadPrescription = async (
    uploadedFile: { id: string } | null
  ) => {
    try {
      console.log("Handle Shopify Reupload ->Selected file:", selectedFile)
      if (!selectedFile) {
        return
      }
      setShowLoader(true)
      // step 1: Get staged upload URL from your backend
      const stageResponse = await fetch("/api/createStagedUpload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: selectedFile.name,
          mimeType: selectedFile.type,
          fileSize: selectedFile.size,
        }),
      })

      const { uploadUrl, resourceUrl, parameters } = await stageResponse.json()

      // step 2: Upload file DIRECTLY to Shopify (no size limit!)
      const formData = new FormData()

      // add Shopify's parameters first
      parameters.forEach(param => {
        formData.append(param.name, param.value)
      })

      // add the actual file
      formData.append("file", selectedFile)

      await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      })

      // step 3: Finalize the file in Shopify
      const finalizeResponse = await fetch("/api/finalizeUploadUpdate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId: uploadedFile ? uploadedFile.id : null,
          resourceUrl,
          fileName: selectedFile.name,
        }),
      })

      // fileUrl, fileId, fileName
      const { fileUrl, fileId } = await finalizeResponse.json()

      console.log("File uploaded to Shopify:", fileUrl)
      if (fileUrl) {
        setShowLoader(false)
        setShowSuccess(true)
        const r = await updateOrderNote(fileUrl)
        const x = await markMetafieldAsTrue()
        // isNowValid()
      } else {
        throw new Error("File URL not returned from finalize upload.")
      }
    } catch (error: any) {
      console.error("Upload failed:", error)
      setShowLoader(false)
    }
  }

  return {
    selectedFile,
    setSelectedFile,
    showSuccess,
    setShowSuccess,
    showLoader,
    setShowLoader,
    handleUploadPrescription,
    handleUpdateUploadPrescription,
    updateOrderNote,
    markMetafieldAsTrue,
  }
}

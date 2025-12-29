import React, { useState, useRef } from "react"
import styled from "styled-components"
import { useRxInfo } from "../../../contexts/rx-info"

const Component = styled.div`
  border-radius: 4px;
  border: 1px solid #666;
  padding: 15px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  button:disabled {
    background-color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
  }
`

type Props = {
  uploadedFile:
    | undefined
    | null
    | {
        id: string
        url: string
      }
  isNowValid: () => void
}

const PrescriptionUpload = ({ uploadedFile, isNowValid }: Props) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const { rxInfoDispatch } = useRxInfo()

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadPrescription = async (file: File) => {
    try {
      setUploading(true)
      // step 1: Get staged upload URL from your backend
      const stageResponse = await fetch("/api/createStagedUpload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          fileSize: file.size,
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
      formData.append("file", file)

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
          fileName: file.name,
        }),
      })

      // fileUrl, fileId, fileName
      const { fileUrl, fileId } = await finalizeResponse.json()

      console.log("File uploaded to Shopify:", fileUrl)
      if (fileUrl) {
        rxInfoDispatch({
          type: "uploaded-file",
          payload: { id: fileId, url: fileUrl },
        })
        setUploading(false)
        isNowValid()
      } else {
        throw new Error("File URL not returned from finalize upload.")
      }
    } catch (error: any) {
      console.error("Upload failed:", error)
      setUploading(false)
    }
  }

  const handleFileDeletion = async (fileID: string) => {
    try {
      setUploading(true)
      console.log("Deleting file with ID:", fileID)
      const deleteResponse = await fetch("/api/deleteShopifyFile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileID }),
      })

      const data = await deleteResponse.json()

      if (data.success) {
        console.log("File deleted successfully:", data.deletedFileId)
        rxInfoDispatch({ type: "uploaded-file", payload: null })
        setUploading(false)
        // clear the file input
        if (fileInput.current) {
          fileInput.current.value = ""
        }
      } else {
        throw new Error("File deletion failed.")
      }
    } catch (error: any) {
      console.error("Deletion failed:", error)
      setUploading(false)
    }
  }

  const handleClearFile = () => {
    setFile(null)
    if (fileInput.current) {
      fileInput.current.value = ""
    }
  }

  return (
    <Component>
      <div>{uploadedFile?.url}</div>
      <input
        ref={fileInput}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
      {uploadedFile ? (
        <button
          type="button"
          onClick={() => handleFileDeletion(uploadedFile.id)}
          disabled={uploading}
        >
          {uploading ? "Removing..." : "Remove Prescription"}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => handleUploadPrescription(file!)}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload Prescription"}
        </button>
      )}
      <button type="button" onClick={handleClearFile} disabled={uploading}>
        Clear
      </button>
    </Component>
  )
}

export default PrescriptionUpload

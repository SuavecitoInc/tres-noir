import React, { useEffect } from "react"
import styled from "styled-components"
import Loader from "./loader"
import { useConfirmPrescription } from "../hooks/useConfirmPrescription"

const Component = styled.div`
  margin: 20px 0;
  p {
    font-family: var(--sub-heading-font);
    margin: 0;
    margin-bottom: 8px;
  }
  table {
    border: 1px solid black;
    tbody {
      tr {
        th {
          font-family: var(--heading-font);
          font-weight: normal;
        }
        td {
          font-family: var(--sub-heading-font);
          font-weight: normal;
        }
        th,
        td {
          border: 1px solid black;
          text-align: center;
          vertical-align: middle;
          padding: 10px 0;
        }
      }
    }
  }
  .button-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    input[type="file"] {
      ::file-selector-button {
        font-family: var(--heading-font);
        background-color: #000;
        /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6); */
        color: #fff;
        display: inline-block;
        font-size: 0.8rem;
        padding: 2px 10px;
        text-decoration: none;
        cursor: pointer;
        -webkit-appearance: button-bevel;
        border: none;
        border-radius: 0%;
      }
      overflow: visible;
    }
    .btn {
      text-transform: uppercase;
      font-family: var(--heading-font);
    }
    p {
      font-family: var(--sub-heading-font);
      margin: 0;
      text-align: center;
    }
    .middle {
      p {
        margin: 6px 0;
      }
    }
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
  .confirmed {
    p {
      color: green;
      text-align: center;
    }
  }
  .button-flex-row {
    display: flex;
  }
  .upload-row {
    margin-top: 20px;
    display: flex;
    column-gap: 30px;
    @media screen and (max-width: 480px) {
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      row-gap: 20px;
    }
  }
  .success-msg {
    color: green;
    text-align: center;
    padding: 10px 0px;
  }
`

interface rxDetails {
  sph: string
  cyl: string
  axis: string
  add: string
  pd: string
}
interface rxType {
  right: rxDetails
  left: rxDetails
}

const PrescriptionUploadConfirm = ({
  lineItem,
  index,
  orderId,
  orderDetails,
}) => {
  const customAttr = lineItem.node.customAttributes.filter(
    el => el.key === "Prescription"
  )
  const foundFrameKey = lineItem.node.customAttributes.find(
    el => el.key === "_frameName"
  )
  const customId = lineItem.node.customAttributes.filter(
    el => el.key === "customizationId"
  )[0].value

  const frameName = foundFrameKey ? foundFrameKey.value : "Frame"
  const frameIdentifier = `${frameName}- (${customId}): `

  const fileUrl = lineItem.node.customAttributes.find(
    attr => attr.key === "_file_url"
  )

  const imgSrc = fileUrl ? fileUrl.value : null

  const fileId = lineItem.node.customAttributes.find(
    attr => attr.key === "_file_id"
  )

  const imgId = fileId ? fileId.value : null

  const uploadedFile = {
    url: imgSrc,
    id: imgId,
  }

  const {
    setSelectedFile,
    showSuccess,
    setShowSuccess,
    showLoader,
    handleUpdateUploadPrescription,
    updateOrderNote,
    markMetafieldAsTrue,
  } = useConfirmPrescription(orderId, frameIdentifier)

  const orderNote = orderDetails.note

  const hasUploadedImage = async () => {
    if (!orderNote) return
    const orderNoteArr = orderNote.split(/\r?\n/)
    orderNoteArr.forEach(str => {
      if (str.includes(frameIdentifier)) {
        setShowSuccess(true)
      }
    })
  }

  useEffect(() => {
    hasUploadedImage()
  }, [])

  const confirmClicked = () => {
    setShowSuccess(true)
    updateOrderNote("")
    markMetafieldAsTrue()
    // add frame to order note and mark as confirmed
  }

  const dropVersionFromImageUrl = (url: string) => {
    const newUrl = new URL(url)
    newUrl.searchParams.delete("v")
    return newUrl.toString()
  }

  return (
    <Component>
      <>
        <p>
          {index}. {frameName}
        </p>
        <div>
          {!showSuccess && !showLoader && (
            <>
              {!imgSrc ? (
                <p>
                  Something went wrong with the prescription image. Please
                  re-upload it below. If you continue to have issues, please
                  contact us.
                </p>
              ) : (
                <img
                  src={dropVersionFromImageUrl(imgSrc)}
                  alt={`Prescription for ${index}. ${frameName}`}
                  style={{
                    maxWidth: "800px",
                    width: "100%",
                    height: "auto",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            </>
          )}
        </div>
        {!showSuccess && !showLoader ? (
          <div>
            <div className="confirmed hide">
              <p>This prescription has been confirmed.</p>
            </div>
            <div className="button-flex">
              <button className="btn" onClick={evt => confirmClicked()}>
                Confirm
              </button>
              <div className="middle">
                <p>- OR -</p>
                <p>Let us confirm for you</p>
              </div>
              <div className="upload-row">
                <input
                  type="file"
                  name="prescriptionImage"
                  id="prescriptionImage"
                  accept="image/*,application/pdf"
                  onChange={
                    /* @ts-ignore */
                    evt => setSelectedFile(evt.target.files[0])
                  }
                />
                <button
                  className="btn"
                  onClick={evt => handleUpdateUploadPrescription(uploadedFile)}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        ) : !showSuccess && showLoader ? (
          <Loader />
        ) : (
          <>
            <SuccessMessage frameName={frameName} />
          </>
        )}
      </>
    </Component>
  )
}

const SuccessMessage = ({ frameName }) => {
  return (
    <div className="success-msg">
      <p>Your prescription for {frameName} has been confirmed.</p>
    </div>
  )
}

export default PrescriptionUploadConfirm

import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import styled from "styled-components"
import { VscClose } from "react-icons/vsc"
import { useStaticQuery, graphql } from "gatsby"
import UpsellProduct from "./upsell-product"
import { UpsellItems, UpsellItem } from "../types/upsell"

const Component = styled.section`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .modal {
    background: white;
    border-radius: 25px;
    padding: 20px;
    position: relative;
    width: 90%;
    max-width: 800px;
    margin: auto;
    @media only screen and (max-width: 600px) {
      padding: 10px;
    }
    .inner-content {
      .heading {
        @media screen and (max-width: 600px) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            padding-left: 10px;
            margin: 0;
            font-size: 1.2rem;
            text-align: left;
          }
        }
      }
      .upsell-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        @media (max-width: 600px) {
          grid-auto-flow: column;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
        }
        place-items: center;
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 15px;
          text-align: center;
          @media (max-width: 600px) {
            margin: 20px 11px 20px 11px;
          }
          a {
            color: black;
            text-decoration: none;
            :visited {
              text-decoration: none;
              color: black;
            }
          }
          p {
            margin-bottom: 5px;
          }
        }
      }
      .upsell-image {
        max-width: 280px;
      }
      h6 {
        text-align: center;
        font-size: 1.6rem;
        font-weight: normal;
        text-transform: uppercase;
      }
      .btn {
        @media (max-width: 600px) {
          font-size: 0.9rem;
          padding: 8px 10px;
        }
      }
    }
  }
  .btn-close {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.65rem;
    @media only screen and (min-width: 601px) {
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
`

const getUpsellItems = () => {
  const { shopifyCollection } = useStaticQuery(graphql`
    query GetUpsellProducts {
      shopifyCollection(handle: { eq: "upsell" }) {
        products {
          id
          featuredImage {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 40)
              }
            }
          }
          title
          handle
          hasOnlyDefaultVariant
          variants {
            storefrontId
            compareAtPrice
            price
            sku
            title
            legacyResourceId
            product {
              collections {
                title
              }
              featuredImage {
                originalSrc
              }
              onlineStoreUrl
              productType
              title
              vendor
            }
          }
          storefrontId
        }
      }
    }
  `)
  return shopifyCollection
}

const UpsellCartPopUp = () => {
  const upsellItems: UpsellItems = getUpsellItems()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  // handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.querySelector(".modal")
      if (modal && !modal.contains(event.target as Node)) {
        handleClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    // get cookie
    const cookieKey = "tn_upsell_shown"
    const upsellCookie = Cookies.get(cookieKey)
    if (!upsellCookie) {
      setIsOpen(true)
    }
    // set cookie for 7 day
    Cookies.set(cookieKey, "true", { expires: 7 })
  }, [])

  if (!isOpen) {
    return null
  }

  return (
    <Component>
      <div className="modal">
        <div className="modal-content">
          <div className="inner-content">
            <div className="heading">
              <h6 className="title">Suggested Add-ons</h6>
              <button type="button" className="btn-close" onClick={handleClose}>
                <VscClose />
              </button>
            </div>
            <div className="row">
              <div className="upsell-cards">
                {upsellItems &&
                  upsellItems.products.map((item: UpsellItem) => (
                    <UpsellProduct key={item.handle} upsellProduct={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Component>
  )
}

export default UpsellCartPopUp

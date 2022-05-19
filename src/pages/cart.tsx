import React, { useEffect, useContext, useRef } from "react"
import { Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/loader"
import QuantitySelector from "../components/quantity-selector"
import { CartContext } from "../contexts/cart"
import { CustomerContext } from "../contexts/customer"
import { LineItem } from "../types/checkout"
import { startedCheckoutGTMEvent } from "../helpers/gtm"
import { VscBeaker, VscClose } from "react-icons/vsc"
import UpsellCart from "../components/upsell-cart"

const Page = styled.div`
  .cart-wrapper {
    max-width: 860px;
    width: 100%;
    padding-left: 22px;
    padding-right: 22px;
    h2 {
      font-weight: normal;
    }
    padding-top: 30px;
    ul {
      .wrapper {
        padding: 0;
      }
      margin: 0;
      li {
        padding: 5px;
        border-radius: 10px;
        .close-btn {
          text-align: right;
          padding: 0px 3px 3px 3px;
          a {
            text-align: right;
            svg {
              font-size: 1.65rem;
            }
          }
        }
        list-style: none;
        background: white;
        margin: 30px 0;
        .card {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          > div {
            flex: 1;
            padding: 0 10px;
          }
          @media (max-width: 600px) {
            flex-direction: column;
            .card-image {
              max-width: 280px;
              align-self: center;
            }
          }
        }
        .card-items {
          .quantity-selector {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              color: var(--color-grey-dark);
              font-size: 100%;
              font-family: var(--sub-heading-font);
            }
          }
        }
        .title {
          /* font-weight: bold; */
          margin-bottom: 0;
          a {
            color: #000;
            text-decoration: none;
          }
        }
        .sub-title {
          display: flex;
          justify-content: space-between;
          color: var(--color-grey-dark);
          span {
            font-family: var(--sub-heading-font);
          }
        }
        .sub-title-customize {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          color: var(--color-grey-dark);
          span {
            font-size: 85%;
            font-family: var(--sub-heading-font);
          }
          .price {
            text-align: right;
          }
        }
        /* img {
          width: 100px;
          height: auto;
        } */
        .remove-item {
          text-decoration: none;
          /* font-weight: bold; */
          color: #000;
        }
      }
    }
    .subtotal {
      text-align: right;
      p {
        :first-child {
          font-size: 1.75rem;
        }
        :not(:first-child) {
          color: var(--color-grey-dark);
          font-family: var(--sub-heading-font);
        }
        margin-bottom: 10px;
      }
    }
    .btn-container {
      text-align: right;
      padding: 15px 0;
      button,
      .button {
        background-color: #000;
        border-radius: 0;
        border: 1px solid #000;
        color: #fff;
        display: block;
        font-family: var(--sub-heading-font);
        padding: 10px 20px;
        text-decoration: none;
        text-transform: uppercase;
        font-family: var(--heading-font);
        -webkit-appearance: button-bevel;
        :hover {
          cursor: pointer;
        }
        @media only screen and (max-width: 480px) {
          display: inline-block;
        }
      }
      /* a {
        text-decoration: none;
        color: #000;
      } */
    }
    p,
    span,
    a,
    h2 {
      font-family: var(--heading-font);
      text-transform: uppercase;
    }
    :nth-child(1) {
      background: #e0e0e0;
    }
    :nth-child(2) {
      background: white;
    }
    hr {
      background-color: black;
      margin-bottom: 0;
      margin: 5px 0 5px 0;
    }
  }
  .customized {
    .step-name {
      color: black;
    }
  }
  .grey-background {
    background: #e0e0e0;
  }
  .empty-cart {
    p {
      font-family: var(--heading-font);
      color: var(--color-grey-dark);
      font-size: 130%;
    }
    h1 {
      text-transform: uppercase;
      font-weight: normal;
      text-align: center;
    }
    .empty-flex {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 0;
    }
  }
  .no-events {
    pointer-events: none;
    opacity: 0.5;
  }
`

const Cart = () => {
  const {
    checkout,
    removeProductFromCart,
    updateProductInCart,
    bundledCustoms,
    removeCustomProduct,
  } = useContext(CartContext)

  const { associateCheckout } = useContext(CustomerContext)

  const stepMap = new Map()
  stepMap.set(1, "RX TYPE")
  stepMap.set(2, "LENS TYPE")
  stepMap.set(3, "LENS MATERIAL")
  stepMap.set(4, "LENS COATING")
  const loadingOverlay = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (checkout) {
      if (checkout.lineItems.length > 0) {
        startedCheckoutGTMEvent(checkout)
      }
      associateCheckout(checkout.id)
      console.log("checkout is currently", checkout)
    }
  }, [checkout])

  const removeMultipleProducts = async (customizationId: string) => {
    loadingOverlay.current?.classList.add("no-events")
    await removeCustomProduct(customizationId)
    loadingOverlay.current?.classList.remove("no-events")
  }

  const updateQuantity = (lineId: string, quantity: number) => {
    updateProductInCart(lineId, quantity)
  }

  const totalSum = lineItems => {
    let sum = 0
    lineItems.forEach(item => {
      sum += parseFloat(item.shopifyItem.variant.price)
    })
    return sum.toFixed(2)
  }

  const priceTimesQuantity = (price: string, quantity: number) => {
    return (Number(price) * quantity).toFixed(2)
  }

  const renderStandardProduct = item => {
    const line = item.lineItems[0]
    return (
      <li key={line.id}>
        <div className="close-btn">
          <a
            className="remove-item"
            href="#"
            onClick={() => removeProductFromCart(line.id)}
          >
            <VscClose />
          </a>
        </div>
        <div className="card">
          <div className="card-image">
            <GatsbyImage
              image={item.image}
              alt={line.variant.title}
            ></GatsbyImage>
          </div>
          <div className="card-items">
            <div>
              <p className="title">
                <Link to={`/products/${line.variant.product.handle}`}>
                  {line.title}
                </Link>
              </p>
              <div className="sub-title">
                <span>
                  {line.variant.title !== "Default Title"
                    ? line.variant.title
                    : ""}
                </span>

                <span className="price">${line.variant.price}</span>
              </div>
            </div>
            <hr />
            <div className="quantity-selector">
              <QuantitySelector
                lineId={line.id}
                quantity={line.quantity}
                updateQuantity={updateQuantity}
              />
              <span className="price total-price">
                ${priceTimesQuantity(line.variant.price, line.quantity)}
              </span>
            </div>
          </div>
        </div>
      </li>
    )
  }

  const renderContent = () => {
    if (checkout) {
      if (checkout?.lineItems.length === 0) {
        return (
          <section className="empty-cart">
            <h1>Cart</h1>
            <div className="grey-background">
              <div className="empty-flex">
                <figure>
                  <picture>
                    <StaticImage
                      src="../images/empty-cart.png"
                      alt="Empty cart icon."
                      height={225}
                    ></StaticImage>
                  </picture>
                </figure>
                <p>Your cart is empty.</p>
                <Link to={"/"} className="btn">
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </section>
        )
      } else {
        return (
          <section>
            <div className="grey-background" ref={loadingOverlay}>
              <section className="cart-items cart-wrapper wrapper">
                <h2>
                  Your cart:{" "}
                  <span className="total">${checkout.subtotalPrice}</span>
                </h2>
                <ul>
                  {/* {bundledCustoms.items.length !== 0 &&
                    bundledCustoms.items.map(item => {
                      if (item) {
                        return (
                          <li key={item.customizationId} className="customized">
                            <div className="close-btn">
                              <a
                                className="remove-item"
                                href="#"
                                onClick={() =>
                                  removeMultipleProducts(item.customizationId)
                                }
                              >
                                <VscClose />
                              </a>
                            </div>

                            <div className="card">
                              <div className="card-image">
                                <GatsbyImage
                                  image={item.customImage.data}
                                  alt={item.customImage.altText}
                                ></GatsbyImage>
                              </div>
                              <div>
                                <div>
                                  <p className="title">
                                    <Link
                                      to={`/products/${item.lineItems[0].shopifyItem.variant.product.handle}`}
                                    >
                                      {item.lineItems[0].shopifyItem.title}
                                    </Link>
                                  </p>
                                  <div className="sub-title-customize">
                                    {item.lineItems.map((subItem, subIndex) => {
                                      return (
                                        <div
                                          className="sub-item"
                                          key={subItem.shopifyItem.id}
                                        >
                                          <div className="step-name">
                                            <p>{stepMap.get(subIndex)}</p>
                                          </div>
                                          <div
                                            className="sub-title"
                                            key={subItem.shopifyItem.id}
                                          >
                                            <span key={subItem.shopifyItem.id}>
                                              {subItem.shopifyItem.variant
                                                .title === "Default Title"
                                                ? subItem.shopifyItem.title
                                                : subItem.shopifyItem.variant
                                                    .title}
                                            </span>
                                            <span className="price">
                                              $
                                              {
                                                subItem.shopifyItem.variant
                                                  .price
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      )
                                    })}
                                    <hr />
                                    <span className="price total-price">
                                      ${totalSum(item.lineItems)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      }
                    })} */}
                  {checkout?.tnLineItems &&
                    checkout?.tnLineItems.map(item => {
                      if (!item.isCustom) {
                        return renderStandardProduct(item)
                      }
                    })}
                </ul>
                <div className="subtotal">
                  <p>
                    Subtotal:{" "}
                    <span className="total">${checkout.subtotalPrice}</span>
                  </p>
                  <p>Delivery & Taxes are calculated at checkout.</p>
                </div>
                <div className="btn-container">
                  <a href={checkout.webUrl} className="btn checkout">
                    Check Out
                  </a>
                </div>
              </section>
            </div>
            <section className="cart-wrapper wrapper">
              <UpsellCart />
            </section>
          </section>
        )
      }
    } else {
      return <Loader />
    }
  }

  return (
    <Layout>
      <SEO title="Cart" />
      <Page>{renderContent()}</Page>
    </Layout>
  )
}

export default Cart

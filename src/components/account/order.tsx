import React from "react"
import { navigate } from "gatsby"
import styled from "styled-components"

import type {
  LineItem as LineItemType,
  Order as OrderType,
} from "../../types/customer-orders"
import { rebuildLineItems, formatAmount } from "../../utils/customerOrders"
import { formatDate } from "../../utils/customerOrders"

const DEBUG = false

interface Props {
  orderData: OrderType
}

const OrderContainer = styled.div`
  .order-header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
  }
  .order-header h2 {
    margin: 0;
  }
  .order-header button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  .order-date {
    color: #666;
    font-size: 0.9rem;
  }
  .columns {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 40px;
    @media only screen and (max-width: 468px) {
      flex-direction: column;
      margin-bottom: 20px;
    }
  }
  .columns div {
    flex: 1;
  }
  .column-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .card {
    border: 1px solid #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    background-color: #f5f5f5;
  }
  .order-info {
    margin-bottom: 20px;
    font-size: 1rem;
    color: #333;
  }
  .order-details {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .custom-steps {
    margin-left: 30px;
  }
  .total {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .block-stack {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .back-button {
    color: #000;
  }
  .status-container {
    display: flex;
    flex-direction: column;
  }
  .status-label {
    font-weight: bold;
  }
  .status-date {
    font-size: 0.9rem;
    color: #666;
  }
  .status-container ul {
    list-style: disc;
    padding-left: 20px;
  }
`

const Order = ({ orderData }: Props) => {
  const lineItems = rebuildLineItems(
    orderData.lineItems.edges.map(({ node }) => node)
  )

  // get fulfillments with at least one item that requires shipping
  const shippableFulfillments = orderData.fulfillments.edges.filter(
    ({ node }) =>
      node.fulfillmentLineItems.edges.some(
        ({ node: lineItemNode }) =>
          lineItemNode.lineItem.requiresShipping === true
      )
  )

  const shipmentStatus =
    shippableFulfillments &&
    shippableFulfillments.length > 0 &&
    shippableFulfillments[0].node.trackingInformation.length > 0 ? (
      <ul>
        <li>
          <span className="status-container">
            <span className="status-label">On its way</span>
            <span className="status-date">
              {formatDate(shippableFulfillments[0].node.updatedAt)}
            </span>
          </span>
        </li>
        <li>
          <span className="status-container">
            <span className="status-label">Confirmed</span>
            <span className="status-date">
              {formatDate(orderData.createdAt)}
            </span>
          </span>
        </li>
      </ul>
    ) : (
      <ul>
        <li>
          <span className="status-container">
            <span className="status-label">Confirmed</span>
            <span className="status-date">
              {formatDate(orderData.createdAt)}
            </span>
          </span>
        </li>
      </ul>
    )

  console.log("shippableFulfillments", shippableFulfillments)

  DEBUG && console.log("Rendering Order component with data:", orderData)
  DEBUG && console.log("Rebuilt line items:", lineItems)

  const goBack = () => {
    navigate("/account/orders")
  }

  return (
    <OrderContainer>
      <div className="order-header">
        <button type="button" onClick={goBack} className="back-button">
          &larr;
        </button>
        <div className="block-stack">
          <h2>Order {orderData.name}</h2>
          <p className="order-date">
            Confirmed {formatDate(orderData.createdAt)}
          </p>
        </div>
      </div>

      <div className="columns">
        <div className="column-stack">
          <div className="card">
            <div className="order-info">
              <div className="tracking-info">
                {shippableFulfillments && shippableFulfillments.length > 0
                  ? shippableFulfillments.map(({ node }, index) => (
                      <div key={index}>
                        <p>
                          {node.trackingInformation[0].company}{" "}
                          <a
                            href={node.trackingInformation[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {node.trackingInformation[0].number}
                          </a>
                        </p>
                      </div>
                    ))
                  : null}
              </div>
              <div className="fulfillment-status">{shipmentStatus}</div>
            </div>
          </div>
          <div className="card">
            {/* <div className="order-info">
            Confirmed {new Date(orderData.createdAt).toLocaleDateString()}
          </div> */}
            <div className="order-details">
              <div>
                <div>
                  <h4>Contact Information</h4>
                  <div className="block-stack">
                    <span>{orderData.customer.displayName}</span>
                    <span>{orderData.customer.emailAddress.emailAddress}</span>
                  </div>
                </div>
                <div>
                  <h4>Shipping Address</h4>
                  {orderData.shippingAddress && (
                    <div className="block-stack">
                      <span>
                        {orderData.shippingAddress.firstName}{" "}
                        {orderData.shippingAddress.lastName}
                      </span>
                      <span>{orderData.shippingAddress.address1}</span>
                      <span>
                        {orderData.shippingAddress.city},{" "}
                        {orderData.shippingAddress.province},{" "}
                        {orderData.shippingAddress.zip}
                      </span>
                      <span>{orderData.shippingAddress.country}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4>Shipping Method</h4>
                  <p>
                    {orderData.shippingLine
                      ? orderData.shippingLine.title
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <h4>Payment</h4>
                  <p>Status: {orderData.paymentInformation.paymentStatus}</p>
                </div>
                <div>
                  <h4>Billing Address</h4>
                  {orderData.billingAddress && (
                    <div className="block-stack">
                      <span>
                        {orderData.billingAddress.firstName}{" "}
                        {orderData.billingAddress.lastName}
                      </span>
                      <span>{orderData.billingAddress.address1}</span>
                      <span>
                        {orderData.billingAddress.city},{" "}
                        {orderData.billingAddress.province},{" "}
                        {orderData.billingAddress.zip}
                      </span>
                      <span>{orderData.billingAddress.country}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card line-items">
            <div>
              {lineItems.map(item => {
                const isCustom = item.isCustom
                const node = isCustom
                  ? (item.steps[0] as LineItemType)
                  : (item as LineItemType)
                return (
                  <div key={node.id}>
                    <p>
                      {node.title} x {node.quantity} - $
                      {formatAmount(node.price.amount)}{" "}
                      {node.price.currencyCode}
                    </p>
                    {isCustom && (
                      <ul className="custom-steps">
                        {/* remove step 0 as it's shown above */}
                        {item.steps.slice(1).map((step: LineItemType) => (
                          <li key={step.id} className="custom-step">
                            <p>
                              {step.title} x {step.quantity} - $
                              {formatAmount(step.price.amount)}{" "}
                              {step.price.currencyCode}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
            <hr />
            <div>
              <p>Subtotal: ${formatAmount(orderData.subtotal.amount)}</p>
              <p>
                Shipping: $
                {orderData.shippingLine?.originalPrice
                  ? formatAmount(orderData.shippingLine.originalPrice.amount)
                  : "0.00"}
              </p>
              <p className="total">
                Total: ${formatAmount(orderData.totalPrice.amount)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </OrderContainer>
  )
}

export default Order

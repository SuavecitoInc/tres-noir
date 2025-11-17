import React from "react"
import { navigate } from "gatsby"
import styled from "styled-components"

import type {
  LineItem as LineItemType,
  Order as OrderType,
} from "../../types/customer-orders"
import { rebuildLineItems } from "../../utils/customerOrders"

const IMAGES_TO_SHOW = 4

interface Props {
  orders: {
    node: OrderType
  }[]
}

const GridItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 5px;
  }
  .image-grid-item {
    width: 100%;
    height: auto;
  }
  .image-grid-item.more-items {
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .view-details-button {
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px 12px;
    width: 100%;
    cursor: pointer;
  }
`

const getLegacyOrderId = (orderId: string) => {
  // Assuming the orderId is in the format "gid://shopify/Order/1234567890"
  const parts = orderId.split("/")
  return parts[parts.length - 1]
}

const Order = ({ order }: { order: OrderType }) => {
  const orderLines = order.lineItems.edges

  const rebuiltLineItems = rebuildLineItems(
    orderLines.map(({ node }: { node: LineItemType }) => node)
  )

  console.log("Rebuilt line items:", rebuiltLineItems)

  const lineItems =
    rebuiltLineItems.length > IMAGES_TO_SHOW
      ? rebuiltLineItems.slice(0, IMAGES_TO_SHOW - 1)
      : rebuiltLineItems

  const navigateToOrderDetails = (orderId: string) => {
    // Implement navigation to order details page
    const legacyOrderId = getLegacyOrderId(orderId)
    console.log("Navigate to order details for order ID:", legacyOrderId)
    navigate(`/account/orders/order?id=${legacyOrderId}`)
  }

  return (
    <GridItem>
      <div className="order-status">
        <p>Status: {order.financialStatus}</p>
      </div>
      <div className="image-grid">
        {lineItems.map(el => {
          const isCustom = el.isCustom
          const item = isCustom
            ? (el.steps[0] as LineItemType)
            : (el as LineItemType)
          const imgSrc = item.image?.url
          return (
            <div key={item.id} className="image-grid-item">
              <img src={imgSrc} alt={item.title} />
            </div>
          )
        })}
        {rebuiltLineItems.length > IMAGES_TO_SHOW && (
          <div className="image-grid-item more-items">
            + {rebuiltLineItems.length - (IMAGES_TO_SHOW - 1)}
          </div>
        )}
      </div>
      <div className="bold">{rebuiltLineItems.length} Items</div>
      <div className="order-number">Order {order.name}</div>
      <div className="order-date">
        Date: {new Date(order.createdAt).toLocaleDateString()}
      </div>
      <div className="order-total">
        Total: ${order.totalPrice.amount} {order.totalPrice.currencyCode}
      </div>
      <button
        type="button"
        className="view-details-button"
        onClick={() => navigateToOrderDetails(order.id)}
      >
        View Details
      </button>
    </GridItem>
  )
}

const Component = styled.div<{ orders: Props["orders"] }>`
  .orders-grid {
    display: grid;
    gap: 20px;
    margin-bottom: 40px;
    grid-template-columns: ${({ orders }) =>
      orders.length === 1
        ? "33%"
        : orders.length === 2
        ? "repeat(2, 1fr)"
        : "repeat(3, 1fr)"};
    @media only screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 468px) {
      grid-template-columns: 1fr;
    }
  }
`

const Orders = ({ orders }: Props) => {
  console.log("Orders component received orders:", orders)
  return (
    <Component orders={orders}>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map(({ node }) => (
            <Order key={node.id} order={node} />
          ))}
        </div>
      )}
    </Component>
  )
}

export default Orders

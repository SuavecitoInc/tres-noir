import React from "react"
import styled from "styled-components"

const IMAGES_TO_SHOW = 3

type LineItemType = {
  id: string
  quantity: number
  customAttributes: {
    key: string
    value: string
  }[]
  sku: string
  title: string
  variantId: string
  productId: string
  variantTitle: string
  variantOptions: {
    name: string
    value: string
  }[][]
}

type OrderType = {
  fulfillments: any[]
  id: string
  fulfillmentStatus: string
  financialStatus: string
  createdAt: string
  lineItems: {
    edges: {
      node: LineItemType
    }[]
  }
  number: string
  totalPrice: {
    amount: string
    currencyCode: string
  }
}

interface Props {
  orders: {
    node: OrderType
  }[]
}

const rebuildLineItems = (lineItems: LineItemType[]) => {
  const items: any = {}
  lineItems.forEach(item => {
    const customizationId = item.customAttributes.find(
      attr => attr.key === "customizationId"
    )?.value

    if (customizationId) {
      if (!items[customizationId]) {
        items[customizationId] = {
          id: customizationId,
          isCustom: true,
          steps: [],
        }
      } else {
        items[customizationId].steps.push(item)
      }
    } else {
      items[item.id] = {
        isCustom: false,
        ...item,
      }
    }
  })

  // convert items object to array
  const itemsArray = Object.values(items)

  // sort steps by customizationStep attribute
  itemsArray.forEach((item: any) => {
    if (item.isCustom) {
      item.steps.sort((a: LineItemType, b: LineItemType) => {
        const stepA = parseInt(
          a.customAttributes.find(attr => attr.key === "customizationStep")
            ?.value || "0",
          10
        )
        const stepB = parseInt(
          b.customAttributes.find(attr => attr.key === "customizationStep")
            ?.value || "0",
          10
        )
        return stepA - stepB
      })
    }
  })

  return itemsArray
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
  }
`

const Order = ({ order }: { order: OrderType }) => {
  const orderLines = order.lineItems.edges

  const rebuiltLineItems = rebuildLineItems(
    orderLines.map(({ node }: any) => node)
  )

  console.log("Rebuilt line items:", rebuiltLineItems)

  const lineItems =
    rebuiltLineItems.length > IMAGES_TO_SHOW
      ? rebuiltLineItems.slice(0, IMAGES_TO_SHOW)
      : rebuiltLineItems

  return (
    <GridItem>
      <div className="order-status">
        <p>Status: {order.financialStatus}</p>
      </div>
      <div className="image-grid">
        {lineItems.map((item: any) => {
          const isCustom = item.isCustom
          const imgSrc = isCustom ? item.steps[0]?.image?.url : item.image?.url
          return (
            <div key={item.id} className="image-grid-item">
              <img src={imgSrc} alt={item.title} />
            </div>
          )
        })}
        {rebuiltLineItems.length > IMAGES_TO_SHOW && (
          <div className="image-grid-item more-items">
            + {rebuiltLineItems.length - IMAGES_TO_SHOW}
          </div>
        )}
      </div>
      <div className="bold">{rebuiltLineItems.length} Items</div>
      <div className="order-number">Order #{order.number}</div>
      <div className="order-total">
        Total: ${order.totalPrice.amount} {order.totalPrice.currencyCode}
      </div>
      <button type="button" className="view-details-button">
        View Details
      </button>
    </GridItem>
  )
}

const Component = styled.div`
  .orders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
`

const Orders = ({ orders }: Props) => {
  console.log("Orders component received orders:", orders)
  return (
    <Component>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map(({ node }: any) => (
            <Order key={node.id} order={node} />
          ))}
        </div>
      )}
    </Component>
  )
}

export default Orders

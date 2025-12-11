import type { LineItem as LineItemType } from "../types/customer-orders"

interface LineItemTypeExtended extends LineItemType {
  isCustom: boolean
  steps: LineItemType[]
}

type ItemTempType = {
  [key: string]:
    | {
        id: string
        isCustom: boolean
        steps: LineItemType[]
      }
    | LineItemTypeExtended
}

export const rebuildLineItems = (lineItems: LineItemType[]) => {
  const items: ItemTempType = {}
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
      }
      items[customizationId].steps.push(item)
    } else {
      items[item.id] = {
        isCustom: false,
        steps: [],
        ...item,
      }
    }
  })

  // convert items object to array
  const itemsArray = Object.values(items)

  // sort steps by customizationStep attribute
  itemsArray.forEach(item => {
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

// fix amount to 2 decimal places
export const formatAmount = (amount: string) => {
  return parseFloat(amount).toFixed(2)
}

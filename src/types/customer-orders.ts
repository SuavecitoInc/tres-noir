export interface Order {
  financialStatus: string
  id: string
  createdAt: string
  number: string
  billingAddress: Address
  customer: Customer
  lineItems: LineItemConnection
  name: string
  shippingAddress: Address
  paymentInformation: PaymentInformation
  shippingLine: any | null
  subtotal: Money
  totalPrice: Money
}

export interface Address {
  address1: string
  address2: string | null
  city: string
  company: string | null
  country: string
  firstName: string
  lastName: string
  formatted: string[]
  formattedArea: string
  id: string
  name: string
  phoneNumber: string | null
  province: string | null
  territoryCode: string | null
  zip: string
}

export interface Customer {
  displayName: string
  emailAddress: {
    emailAddress: string
  }
  firstName: string
  id: string
  lastName: string
}

export interface LineItemConnection {
  edges: {
    node: LineItem
  }[]
}

export interface LineItem {
  id: string
  quantity: number
  customAttributes: {
    key?: string
    value?: string
  }[]
  sku: string
  title: string
  variantId: string
  productId: string
  variantTitle: string | null
  variantOptions: VariantOption[]
  image: Image
  price: Money
}

export interface VariantOption {
  name: string
  value: string
}

export interface Image {
  altText: string | null
  height: number
  id: string
  url: string
  width: number
}

export interface Money {
  amount: string
  currencyCode: string
}

export interface PaymentInformation {
  paymentStatus: string
  totalPaidAmount: Money
}

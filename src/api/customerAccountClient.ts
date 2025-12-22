const API_VERSION = "2025-10"
const SHOP_ID = process.env.GATSBY_CUSTOMER_ACCOUNTS_SHOP_ID!
const CUSTOMER_ACCOUNT_API_URL = `https://shopify.com/${SHOP_ID}/account/customer/api/${API_VERSION}/graphql`

export async function queryCustomerAccount(
  accessToken: string,
  query: string,
  variables?: Record<string, any>
) {
  const response = await fetch(CUSTOMER_ACCOUNT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(
      "Customer Account API request failed, please sign in again."
    )
  }

  const jsonResponse = await response.json()
  return jsonResponse
}

// Example: Get customer info
export async function getCustomerInfo(accessToken: string) {
  const query = `#graphql
    query getCustomer {
      customer {
        id
        emailAddress {
          emailAddress
        }
        firstName
        lastName
        phoneNumber {
          phoneNumber
        }
        defaultAddress {
          address1
          address2
          city
          zip
        }
        companyContacts(first: 10) {
          edges {
            node {
              id
              company {
                id
                name
              }
              customer {
                id
                emailAddress {
                  emailAddress
                }
                firstName
                lastName
                displayName                    
              }
            }
          }
        }
      }
    }
  `

  return queryCustomerAccount(accessToken, query)
}

// Example: Get customer orders
export async function getCustomerOrders(
  accessToken: string,
  first: number = 10
) {
  const query = `#graphql
    query getOrders($first: Int!) {
      customer {
        orders(first: $first, reverse: true) {
          edges {
            node {
              id
              number
              name
              createdAt
              financialStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 250) {
                edges {
                  node {
                    id
                    quantity
                    customAttributes {
                      key
                      value
                    }
                    sku
                    title
                    variantId
                    productId
                    variantTitle
                    variantOptions {
                      name
                      value
                    }
                    image {
                      altText
                      height
                      id
                      url(transform: {
                            maxWidth: 200,
                            maxHeight: 200,
                            crop: CENTER
                          })
                      width
                    }
                  }
                }
              }
              fulfillments(first: 10) {
                edges {
                  node {
                    status
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  return queryCustomerAccount(accessToken, query, { first })
}

export async function getCustomerOrder(accessToken: string, id: string) {
  const query = `#graphql
    query getOrder($id: ID!) {
      order(id: $id) {
        id
        number
        createdAt
        financialStatus
        billingAddress {
          address1
          address2
          city
          company
          country
          firstName
          lastName
          formatted
          formattedArea
          id
          name
          phoneNumber
          province
          territoryCode
          zip
        }
        customer {
          displayName
          emailAddress {
            emailAddress
          }
          firstName
          id
          lastName
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              quantity
              customAttributes {
                key
                value
              }
              sku
              title
              variantId
              productId
              variantTitle
              variantOptions {
                name
                value
              }
              image {
                altText
                height
                id
                url(transform: {
                      maxWidth: 200,
                      maxHeight: 200,
                      crop: CENTER
                    })
                width
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
        name
        shippingAddress {
          address1
          address2
          city
          company
          country
          firstName
          lastName
          formatted
          formattedArea
          id
          name
          phoneNumber
          province
          territoryCode
          zip
        }
        paymentInformation {
          paymentStatus
          totalPaidAmount {
            amount
            currencyCode
          }
        }
        shippingLine {
          title
          originalPrice {
            amount
            currencyCode
          }
        }
        subtotal {
          amount
          currencyCode
        }
        totalPrice {
          amount
          currencyCode
        }
        fulfillments(first: 10) {
          edges {
            node {
              status
              latestShipmentStatus
              updatedAt
              trackingInformation {
                company
                number
                url
              }
              fulfillmentLineItems(first: 250) {
                edges {
                  node {
                    id
                    lineItem {
                      productType
                      requiresShipping
                      quantity
                      sku
                    }
                    quantity
                  }
                }
              }
              events(first: 25) {
                edges {
                  node {
                    id
                    happenedAt
                    status
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  return queryCustomerAccount(accessToken, query, { id })
}

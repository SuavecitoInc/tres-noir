export interface CustomerInfo {
  id: string
  firstName: string
  lastName: string
  displayName: string
  emailAddress: {
    emailAddress: string
  }
  phoneNumber: {
    phoneNumber: string
  }
  defaultAddress: {
    address1: string
    address2: string | null
    city: string
    zip: string
  } | null
  companyContacts: {
    edges: {
      node: {
        id: string
        company: {
          id: string
          name: string
        }
        customer: {
          id: string
          emailAddress: {
            emailAddress: string
          }
          firstName: string
          lastName: string
          displayName: string
        }
      }
    }[]
  }
}

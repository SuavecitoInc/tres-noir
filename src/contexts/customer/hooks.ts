import { useContext } from "react"

import { CustomerContext } from "./context"

export const useCustomer = () => useContext(CustomerContext)

export default useCustomer

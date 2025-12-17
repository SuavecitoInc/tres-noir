import React from "react"
import Form from "./form"
import FormV2 from "./form-v2"

type Props = {
  handle: string
}

const CollectionPath: React.FC<Props> = ({ handle }) => {
  return <FormV2 handle={handle} />
}

export default CollectionPath

import React from "react"
import Form from "./form"

type Props = {
  handle: string
}

const CollectionPath: React.FC<Props> = ({ handle }) => {
  return <Form handle={handle} />
}

export default CollectionPath

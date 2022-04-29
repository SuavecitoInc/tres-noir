import React from "react"
import { connectHits } from "react-instantsearch-dom"
import styled from "styled-components"
import Hit from "./hit"

interface HitProps {
  handle: string
  image: string
  max_variant_price: string
  min_variant_price: string
  objectID: string
  option_names: string[]
  price: string
  product_type: string
  style_description: string
  tags: string[]
  title: string
  vendor: string
}

const Component = styled.ul`
  margin: 1.75rem auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  @media only screen and (max-width: 1024px) {
    gap: 1rem;
  }
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    gap: 0;
  }
  @media only screen and (max-width: 468px) {
    grid-template-columns: 1fr;
  }
  li {
    list-style: none;
  }
`

const Hits = ({ hits }) => (
  <Component>
    {hits.map((hit: HitProps) => (
      <li key={hit.objectID}>
        <Hit hit={hit} />
      </li>
    ))}
  </Component>
)

export default connectHits(Hits)
import React from "react"
import styled from "styled-components"

const Component = styled.div`
  font-size: 1.15rem;
  color: white;
  padding: 0 10px;
  border-radius: 6px;
  font-family: var(--sub-heading-font);
  text-transform: uppercase;
  align-self: flex-start;
`

type Props = {
  color: string
  label: string
  top?: number
  bottom?: number
  left?: number
  right?: number
  position?: "absolute" | "relative" | "static"
}

const Badge = ({
  color,
  label,
  top,
  bottom,
  left,
  right,
  position = "absolute",
}: Props) => {
  const vertical = bottom !== undefined ? { bottom, top } : { top: top ?? 13 }
  const horizontal = right !== undefined ? { right, left } : { left: left ?? 0 }

  return (
    <Component
      style={{ backgroundColor: color, position, ...vertical, ...horizontal }}
    >
      {label}
    </Component>
  )
}

export default Badge

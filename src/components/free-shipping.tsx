import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Component = styled.div`
  text-align: center;
  .top-msg {
    text-transform: uppercase;
    font-family: var(--heading-font);
    font-weight: normal;
    margin-top: 0.5rem;
    margin-bottom: 0.2rem;
    font-size: 1.5rem;
    @media screen and (max-width: 480px) {
      font-size: 1.3rem;
    }
  }
  .bottom-msg {
    color: var(--color-grey-dark);
    font-family: var(--sub-heading-font);
    font-weight: normal;
    font-size: 1.25rem;
    @media screen and (max-width: 480px) {
      font-size: 1rem;
    }
  }
  .shipping-message.no-bottom {
    margin-bottom: 1.45rem;
  }
`

const DEFAULT_MESSAGE = "NON-CUSTOM ORDERS SHIP SAME OR NEXT BUSINESS DAY"

const FreeShipping = () => {
  const data = useStaticQuery(graphql`
    query getShippingMessage {
      contentfulHomepage {
        shippingMessage
        shippingMessageToggle
      }
    }
  `)
  const { shippingMessage, shippingMessageToggle } = data.contentfulHomepage

  // removed default message
  const message: false | string = shippingMessageToggle
    ? shippingMessage
    : false

  return (
    <Component>
      <div
        className={message ? "shipping-message" : "shipping-message no-bottom"}
      >
        <StaticImage
          src="../images/double-diamonds.png"
          alt="double diamonds"
          width={38}
        />
        <p className="top-msg">Free US Shipping When you Spend $50</p>
        {message && <p className="bottom-msg">{message}</p>}
      </div>
    </Component>
  )
}

export default FreeShipping

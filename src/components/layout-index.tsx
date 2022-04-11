import React, { useState, useEffect, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { CustomerContext } from "../contexts/customer"
import { identifyCustomerKlaviyoEvent } from "../helpers/klaviyo"

import Header from "./header"
import Drawer from "./drawer"
import Footer from "./footer"
import "./layout.css"
import "./fonts.css"

const Main = styled.main`
  max-width: 100%;
  .container {
    max-width: 1440px;
    margin: auto;
  }
`

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQueryIndex {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { customerEmail } = useContext(CustomerContext)

  useEffect(() => {
    if (customerEmail) identifyCustomerKlaviyoEvent(customerEmail)
  }, [customerEmail])

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        isIndex
      />
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout

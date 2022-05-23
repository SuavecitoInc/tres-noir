import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import ErrorModal from "./error-modal"

import Header from "./header"
import Drawer from "./drawer"
import Footer from "./footer"
import "./fonts.css"
import "./layout.css"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <main>{children}</main>
      <Footer />
      <ErrorModal />
    </>
  )
}

export default Layout

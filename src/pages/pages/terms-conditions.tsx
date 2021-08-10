import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const TermsandConditions = () => {
  return (
    <Layout>
      <SEO title="Terms and Conditions" />
      <Page>
        <h1>Terms and Conditions</h1>
        <div className="paragraph">
          <h2>SHIPPING</h2>
          <p>
            Free U.S shipping on all orders over $50. Most orders ship same day
            if received before 2pm Pacific time M-F. Orders received on the
            weekend or U.S. Federal holidays will ship the next business day.
            Tracking numbers will be emailed when orders ship
          </p>
          <p>
            All orders ship from our warehouse in Southern California. Domestic
            transit time is 1-5 days depending on your location.
          </p>
          <p>
            Domestic mainland orders ship US POST unless otherwise requested.
            Next Day air is available upon request.
          </p>

          <h2>International Orders</h2>
          <p>
            VAT, Duties and other Local Taxes may apply upon delivery. Rates
            vary by country. Expect to pay additional govt. fees before
            receiving your order. Orders typically arrive within 5-10 days
          </p>
        </div>

        <div className="paragraph">
          <h2>WARRANTY</h2>
          <p>
            All Tres Noir glasses come with a 1 year manufacturers warranty.
            This protects against any manufacturer defects. This does not
            include lens scratches, accidents, normal wear & tear or theft.
          </p>
          <p>
            If it is determined a product has a defect we will repair or
            replace.
          </p>
          <p>
            To make a warranty claim please email-{" "}
            <strong>info@tresnoir.com.</strong>
          </p>
          <p>
            We will not accept a warranty return without a return authorization
            number.
          </p>
          <p>
            NOTE: If your glasses are damaged from an accident or wear & tear,
            many times we can help, email us for more info. info@tresnoir.com.
          </p>
          <p>
            We also stock replacement lenses for many of our frames. Replacement
            lenses can be purchased for $46.00.
          </p>
        </div>

        <div className="paragraph">
          <h2>RETURN POLICY</h2>
          <p>
            Rx & Custom Lenses are NON-REFUNDABLE. The return policy does not
            apply to Rx & Custom Orders. All sales are final for Rx & Custom
            lenses. Tres Noir offers a "no questions asked" return policy. If
            you are unsatisfied for any reason you can return your order for
            exchange or refund.
          </p>
          <p>
            Returns must be received within 30 days of your original order.
            Items must be in original packaging and in new, unworn condition.
          </p>
          <p>
            Exchanges and Refunds will be issued within 3 business days of
            receipt.
          </p>
          <p>Click below to download the return form.</p>
          <a href="#">RETURN FORM</a>
        </div>
      </Page>
    </Layout>
  )
}

export default TermsandConditions

const Page = styled.div`
  margin: auto;
  width: 640px;
  max-width: 100%;
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;

    .paragraph {
      display: flex;
      h2 {
        padding: 10px;
        justify-content: flex-start;
      }

      p {
        flex-wrap: wrap;
      }
    }
  }

  @media screen and (max-width: 750px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 2px;
    }

    .paragraph {
      display: flex;
      justify-content: flex-start;
      p {
        align-items: center;
        justify-content: center;
      }
    }

    h2 {
      padding: 0 10px;
    }
  }
`

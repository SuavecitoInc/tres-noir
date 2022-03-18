import React, { useContext } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import {
  ShopifyCollection,
  ShopifyProduct,
  ShopifyVariant,
} from "../../types/global"
import { CustomizeContext } from "../../contexts/customize"
import { RxInfoContext } from "../../contexts/rxInfo"

const Component = styled.form`
  padding: 10px;
  .step-header {
    font-family: var(--heading-font);
    text-transform: uppercase;
  }
  .product-option {
    background-color: var(--color-grey-light);
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    padding: 10px;
    position: relative;
    &.with-variants {
      flex-wrap: wrap;
    }
    > div {
      padding: 0 10px;
    }
    p {
      line-height: 1;
      margin-bottom: 0;
    }
    .gatsby-image-wrapper {
      max-width: 40px;
      max-height: 40px;
    }
    img {
      align-self: center;
    }
    .product-description {
      max-width: calc(100% - 65px);
      min-height: 40px;
    }
    h4,
    h6 {
      font-family: var(--sub-heading-font);
      margin-bottom: 0;
      text-transform: uppercase;
    }
    input[type="radio"] {
      height: calc(100% - 10px);
      opacity: 0;
      position: absolute;
      width: calc(100% - 10px);
      z-index: 2;
      :hover {
        cursor: pointer;
      }
      :checked ~ .checkmark:after {
        display: block;
      }
    }
    .checkmark {
      border: 1px solid #000;
      border-radius: 50%;
      height: 25px;
      position: relative;
      width: 25px;
      align-self: center;
      margin-left: auto;
      padding-left: 0;
      :after {
        content: "";
        position: absolute;
        display: none;
        left: 7px;
        top: 2px;
        width: 8px;
        height: 16px;
        border: solid #000;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
  }
  button,
  .button {
    background-color: #000;
    border-radius: 0;
    border: 1px solid #000;
    color: #fff;
    display: block;
    font-family: var(--sub-heading-font);
    padding: 10px 20px;
    text-decoration: none;
    :hover {
      cursor: pointer;
    }
    @media only screen and (max-width: 480px) {
      display: inline-block;
    }
  }
  .rx-info {
    font-family: var(--sub-heading-font);
    .rx-box {
      display: flex;
      justify-content: space-between;
      margin: 25px 0;
      .rx-col {
        flex: 1;
        p {
          text-align: center;
          margin-bottom: 5px;
        }
        .rx-select {
          border-bottom: 1px solid #808080;
          display: flex;
          label {
            color: #808080;
          }
          select {
            margin-left: 15px;
            border: none;
            width: 100%;
          }
        }
      }
    }
    .rx-prism {
      p {
        color: #808080;
        margin: 0;
        span {
          color: initial;
        }
      }
    }
  }
  ul.variants {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 100%;
    margin: 0 auto;
    padding: 10px 10%;
    li {
      display: flex;
      flex-direction: row;
      height: 30px;
      margin-bottom: 5px;
      padding-right: 10px;
      position: relative;
      width: 50%;
      @media only screen and (max-width: 768px) {
        width: 100%;
      }
      .variant-image {
        max-height: 30px;
        max-width: 30px;
      }
      .variant-description {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      div {
        padding-left: 5px;
      }
      p {
        line-height: 0.5;
      }
      .checkmark {
        @media only screen and (min-width: 1024px) {
          margin-right: 40px;
        }
        @media only screen and (min-width: 1200px) {
          margin-right: 25%;
        }
      }
    }
  }
`

const Form = ({
  shopifyCollection,
}: {
  shopifyCollection: ShopifyCollection
}) => {
  const {
    currentStep,
    setCurrentStep,
    productUrl,
    selectedVariants,
    setSelectedVariants,
  } = useContext(CustomizeContext)
  const stepMap = new Map()
  stepMap.set(1, "RX TYPE")
  stepMap.set(2, "LENS TYPE")
  stepMap.set(3, "LENS MATERIAL")
  stepMap.set(4, "LENS COATING")
  const { isRxAble, setRxAble } = useContext(RxInfoContext)
  const handleChange = (variant: ShopifyVariant) => {
    setRxAble(variant.product?.title !== "Non-Prescription Lens")
    setSelectedVariants({
      ...selectedVariants,
      [`step${currentStep}`]: variant,
    })
  }
  // const handleSteps = () => {}
  /* tests */
  // useEffect(() => {
  //   console.log(selectedVariants)
  // }, [selectedVariants])
  const range = (start: number, end: number, step: number): string[] => {
    const arr: string[] = []
    const format: number = step % 1 === 0 ? 0 : 2
    for (let i = start; i < end + step; i += step) {
      arr.push(i.toFixed(format))
    }
    return arr
  }

  return (
    <Component>
      <div className="step-header">
        <p>Choose your {stepMap.get(currentStep)}</p>
      </div>
      {shopifyCollection.products.map((product: ShopifyProduct) => (
        <React.Fragment key={product.id}>
          {product.variants.length === 1 ? (
            <div className="product-option">
              <GatsbyImage
                image={
                  product.images[0].localFile.childImageSharp.gatsbyImageData
                }
                alt={product.images[0].altText || product.title}
              />
              <div className="product-description">
                <h4>
                  {product.title}{" "}
                  <span className="price">
                    {` + $${product.variants[0].price}`}
                  </span>
                </h4>
                <p>{product.description}</p>
              </div>
              <input
                type="radio"
                name={`step${currentStep}`}
                id={product.id}
                aria-label={product.title}
                onChange={() => handleChange(product.variants[0])}
                checked={
                  product.variants[0].storefrontId ===
                  selectedVariants[`step${currentStep}`].storefrontId
                }
              />
              <div className="checkmark" />
            </div>
          ) : (
            <div className="product-option with-variants">
              <GatsbyImage
                image={
                  product.images[0].localFile.childImageSharp.gatsbyImageData
                }
                alt={product.images[0].altText || product.title}
              />
              <div className="product-description">
                <h4>{product.title}</h4>
                <p>{product.description}</p>
              </div>
              <ul className="variants">
                {product.variants.map((variant: ShopifyVariant) => (
                  <li key={variant.storefrontId}>
                    <GatsbyImage
                      image={
                        variant.image.localFile.childImageSharp.gatsbyImageData
                      }
                      alt={variant.title}
                      className="variant-image"
                    />
                    <div className="variant-description">
                      <h6>
                        {variant.title}
                        <span className="price">
                          {` + $${product.variants[0].price}`}
                        </span>
                      </h6>
                    </div>
                    <input
                      type="radio"
                      name={`step${currentStep}`}
                      id={product.id}
                      aria-label={product.title}
                      onChange={() => handleChange(variant)}
                      checked={
                        variant.storefrontId ===
                        selectedVariants[`step${currentStep}`].storefrontId
                      }
                    />
                    <div className="checkmark" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </React.Fragment>
      ))}
      {currentStep === 1 && isRxAble ? (
        <div className="rx-info">
          <div className="rx-box">
            <div className="rx-col">
              <p>Right Eye (OD)</p>
              <div className="rx-select">
                <label htmlFor="sph-right">SPH</label>
                <select id="sph-right">
                  {range(-20, 19.75, 0.25).map(el => {
                    if (el !== "0.00") {
                      return <option>{el}</option>
                    }
                    return <option selected>{el}</option>
                  })}
                </select>
              </div>
              <div className="rx-select">
                <label htmlFor="cyl-right">CYL</label>
                <select id="cyl-right">
                  {range(-20, 19.75, 0.25).map(el => {
                    if (el !== "0.00") {
                      return <option>{el}</option>
                    }
                    return <option selected>{el}</option>
                  })}
                </select>
              </div>
              <div className="rx-select">
                <label htmlFor="axis-right">Axis</label>
                <select id="axis-right">
                  <option selected disabled>
                    &nbsp;
                  </option>
                  {range(1, 180, 1).map(el => (
                    <option value={el}>{el}</option>
                  ))}
                </select>
              </div>
              <div className="rx-select">
                <label htmlFor="add-right">Add</label>
                <select id="add-right">
                  <option selected disabled>
                    &nbsp;
                  </option>
                  {range(0, 3.5, 0.25).map(el => (
                    <option value={el}>{el}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="rx-col">
              <p>Left Eye (OS)</p>
              <div className="rx-select">
                <label htmlFor="sph-left">SPH</label>
                <select id="sph-left">
                  {range(-20, 19.75, 0.25).map(el => {
                    if (el !== "0.00") {
                      return <option>{el}</option>
                    }
                    return <option selected>{el}</option>
                  })}
                </select>
              </div>
              <div className="rx-select">
                <label htmlFor="cyl-left">CYL</label>
                <select id="cyl-left">
                  {range(-20, 19.75, 0.25).map(el => {
                    if (el !== "0.00") {
                      return <option>{el}</option>
                    }
                    return <option selected>{el}</option>
                  })}
                </select>
              </div>
              <div className="rx-select">
                <label htmlFor="axis-left">Axis</label>
                <select id="axis-left">
                  <option selected disabled>
                    &nbsp;
                  </option>
                  {range(1, 180, 1).map(el => (
                    <option value={el}>{el}</option>
                  ))}
                </select>
              </div>
              <div className="rx-select">
                <label htmlFor="add-left">Add</label>
                <select id="add-left">
                  <option selected disabled>
                    &nbsp;
                  </option>
                  {range(0, 3.5, 0.25).map(el => (
                    <option value={el}>{el}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="rx-box">
            <div className="rx-col">
              <div className="rx-select">
                <label htmlFor="add-left">Add</label>
                <select id="add-left">
                  <option selected disabled>
                    &nbsp;
                  </option>
                  {range(0, 3.5, 0.25).map(el => (
                    <option value={el}>{el}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="rx-col">
              <div className="rx-select">
                <label htmlFor="add-left">Add</label>
                <select id="add-left">
                  <option selected disabled>
                    &nbsp;
                  </option>
                  {range(0, 3.5, 0.25).map(el => (
                    <option value={el}>{el}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="rx-prism">
            <p>
              Need prism corection? Email <span>info@tresnoir.com</span> or call{" "}
              <span>714-656-4796</span>
            </p>
          </div>
        </div>
      ) : null}
      <div className="row">
        {currentStep === 1 ? (
          <Link className="button" to={productUrl}>
            GO BACK
          </Link>
        ) : (
          <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
            GO BACK
          </button>
        )}
        <button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
          CONTINUE
        </button>
      </div>
    </Component>
  )
}

export default Form

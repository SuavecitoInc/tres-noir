import React, { useContext, useRef, useState, useEffect, useMemo } from "react"
import { Component } from "./styles"
import { SelectedVariantStorage } from "../../types/global"
import { useCustomizer } from "../../contexts/customizer"
import { RxInfoContext } from "../../contexts/rxInfo"
import type {
  LocalCart,
  rxType,
} from "../../contexts/storefront-cart/types/storefront-cart"
import ReadersTable from "./components/readers-table"
import useCollectionDiscountedPricing from "../../hooks/useCollectionDiscountedPricing"
import FormNavigation from "./components/form-navigation"
import RxInfoForm from "./components/rx-info-form"
import ProductList from "./components/product-list"
import { useFormValidation } from "./hooks/useFormValidation"
import { usePrescriptionLogic } from "./hooks/usePrescriptionLogic"

import type { AvailablePath, Variant } from "../../contexts/customizer/types"

type Props = {
  handle: string
}

const FormV2 = ({ handle }: Props) => {
  const {
    selectedCollectionPath,
    currentStep,
    setCurrentStep,
    selectedVariants,
    setSelectedVariants,
    hasSavedCustomized,
    setHasSavedCustomized,
  } = useCustomizer()

  const [currentCollection, setCurrentCollection] = useState<AvailablePath>(
    selectedCollectionPath
  )

  const isNonPrescription = currentCollection?.title === "Non-Prescription"
  const isSingleVision = currentCollection?.title === "Single Vision"
  const isReaders = currentCollection?.title === "Readers"

  const { isRxAble, setRxAble, rxInfo, rxInfoDispatch } =
    useContext(RxInfoContext)
  const messageRef = useRef<any>(null)

  const [isFormValid, setIsFormValid] = useState(true)
  const errorRefs = useRef({})
  const continueBtn = useRef<HTMLButtonElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  // start discounted prices
  const prices = useMemo(
    () =>
      selectedCollectionPath?.products
        ? selectedCollectionPath?.products
            ?.map(p =>
              p?.variants?.map(v => {
                return {
                  id: v.legacyResourceId,
                  price: v.price,
                  handle: p.handle,
                }
              })
            )
            .flat()
        : [],
    [selectedCollectionPath]
  )

  const { offer, isApplicable, discountedPrices } =
    useCollectionDiscountedPricing({ prices, handle })

  // Use validation and prescription hooks
  const { verifyForm, isNowValid, clearErrors, removeChildNodes } =
    useFormValidation({
      isNonPrescription,
      isReaders,
      rxInfo,
      messageRef,
      continueBtn,
      errorRefs,
    })

  const { handleRx, range } = usePrescriptionLogic({
    rxInfoDispatch,
    clearErrors,
    isNowValid: () => isNowValid(isFormValid),
  })

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement> | null,
    variant: Variant,
    isSetFromEvent: boolean = true
  ) => {
    // set isRxAble via the path selection
    // check if product title does not contain Non-Prescription Lens
    setRxAble(variant.product?.title.includes("Non-Prescription") === false)
    if (variant.product?.title.includes("Single Vision")) {
      if (messageRef.current) {
        if (messageRef.current.querySelector("#readers-error")) {
          removeChildNodes(messageRef.current)
          continueBtn.current?.classList.remove("disable")
        }
      }
      rxInfoDispatch({ type: `right-add`, payload: "" })
      rxInfoDispatch({ type: `left-add`, payload: "" })
      if (errorRefs.current[`select-right-add`])
        errorRefs.current[`select-right-add`].classList.add("disable")
      if (errorRefs.current[`select-right-add`])
        errorRefs.current[`select-right-add`].querySelector("select").value = ""
      if (errorRefs.current[`select-left-add`])
        errorRefs.current[`select-left-add`].classList.add("disable")
      if (errorRefs.current[`select-left-add`])
        errorRefs.current[`select-left-add`].querySelector("select").value = ""
    } else if (variant.product?.title === "Reader's") {
      if (messageRef.current) {
        removeChildNodes(messageRef.current)
        continueBtn.current?.classList.remove("disable")
      }
    } else {
      if (messageRef.current) {
        if (messageRef.current.querySelector("#readers-error")) {
          removeChildNodes(messageRef.current)
          continueBtn.current?.classList.remove("disable")
        }
      }
    }
    setHasSavedCustomized({
      ...hasSavedCustomized,
      [`step${currentStep}`]: isSetFromEvent,
    })

    setSelectedVariants({
      ...selectedVariants,
      [`step${currentStep}`]: variant,
    })
  }

  const handleSteps = (num: number) => {
    // scroll to top
    const customizeDiv = topRef.current?.closest(".product-customize")
    customizeDiv?.scrollIntoView()
    if (currentStep === 1 && num === -1) {
      setCurrentStep(currentStep + num)
    }
    if (verifyForm()) {
      setIsFormValid(true)
      setCurrentStep(currentStep + num)
      return
    }
  }

  useEffect(() => {
    if (isApplicable) {
      const tempCollection = structuredClone(selectedCollectionPath)
      const patchedProducts = tempCollection.products.map((p: any) => {
        const patchedVariants = p.variants.map((v: any) => {
          const discountedPriceObj = discountedPrices.find(
            dp => dp.id === v.legacyResourceId
          )
          if (discountedPriceObj) {
            return {
              ...v,
              compareAtPrice: v.price,
              price: discountedPriceObj.discountedPrice,
            }
          }
          return v
        })
        return { ...p, variants: patchedVariants }
      })
      setCurrentCollection({
        ...tempCollection,
        products: patchedProducts,
      })
    }
  }, [selectedCollectionPath, isApplicable, discountedPrices])

  // get all product variants in a flat array
  const allVariants = useMemo(
    () => currentCollection?.products?.flatMap(p => p.variants) ?? [],
    [currentCollection?.products]
  )

  useEffect(() => {
    let variantToSet: Variant = currentCollection?.products[0]?.variants[0]
    if (
      hasSavedCustomized[`step${currentStep}`] === false &&
      currentCollection?.products[0]?.variants[0]
    ) {
      variantToSet = currentCollection.products[0].variants[0]
    } else if (hasSavedCustomized[`step${currentStep}`] === true) {
      // find the variant in allVariants to get updated price if discounted
      const selectedVariantId =
        selectedVariants[`step${currentStep}`].legacyResourceId
      const foundVariant = allVariants.find(
        v => v.legacyResourceId === selectedVariantId
      )
      variantToSet = selectedVariants[`step${currentStep}`]
      // check if price has changed due to discount
      if (
        foundVariant &&
        foundVariant.price !== selectedVariants[`step${currentStep}`].price
      ) {
        variantToSet = foundVariant
      }
    }
    handleChange(null, variantToSet, true)
  }, [allVariants, currentCollection?.products])

  // restore on refresh
  useEffect(() => {
    if (!hasSavedCustomized.step1) {
      const isBrowser: boolean = typeof window !== "undefined"
      if (isBrowser) {
        const urlParams = new URLSearchParams(window.location.search)
        const custom_id = urlParams.get("custom_id")
        if (!custom_id) return
        const customsResume = localStorage.getItem("customs-resume")
        const checkoutString = localStorage.getItem("checkout")
        if (customsResume && custom_id && checkoutString) {
          const customsStorage = JSON.parse(
            customsResume
          ) as SelectedVariantStorage
          const cartStorage = JSON.parse(checkoutString) as LocalCart
          const customInCart = cartStorage.value?.tnLineItems?.find(
            el => el.id === custom_id
          )
          const rxAttr = customInCart?.lineItems[1].shopifyItem.attributes.find(
            el => el.key === "Prescription"
          )
          if (rxAttr && rxAttr.value !== "Non-Prescription") {
            // set Rx
            const prescription = JSON.parse(rxAttr.value) as rxType
            rxInfoDispatch({
              type: `full`,
              payload: prescription,
            })
          }
          const parsedCustoms = customsStorage.value.customs
          const resumedSelectedVariants =
            parsedCustoms[Number(custom_id)].selectedVariants
          // prepare context for editing
          // setting context
          setSelectedVariants(resumedSelectedVariants)
          // set rx context
          // setting savedCustomized context so radio won't default to top option
          setHasSavedCustomized({
            step1: true,
            step2: true,
            case: true,
          })
          setCurrentStep(1)
        }
      }
    }
  }, [])

  return (
    <Component>
      <div className="step-header" ref={topRef}>
        <p>Choose your {currentCollection.title} option:</p>
      </div>

      <ProductList
        products={currentCollection?.products}
        currentCollection={currentCollection}
        currentStep={currentStep}
        selectedVariants={selectedVariants}
        handleChange={handleChange}
      />

      {isRxAble && !isReaders ? (
        <RxInfoForm
          rxInfo={rxInfo}
          handleRx={handleRx}
          errorRefs={errorRefs}
          isSingleVision={isSingleVision}
          range={range}
        />
      ) : isReaders ? (
        <ReadersTable
          clearErrors={clearErrors}
          isNowValid={() => isNowValid(isFormValid)}
        />
      ) : null}

      <FormNavigation handleSteps={handleSteps} continueBtn={continueBtn} />

      <ul className="form-error" ref={messageRef}></ul>
    </Component>
  )
}

export default FormV2

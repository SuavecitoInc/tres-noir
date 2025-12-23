import React, { useRef, useState, useEffect, useMemo } from "react"
import { Component } from "./styles"
import { useCustomizer } from "../../contexts/customizer"
import { useRxInfo } from "../../contexts/rx-info"
import ReadersTable from "./components/readers-table"
import useCollectionDiscountedPricing from "../../hooks/useCollectionDiscountedPricing"
import FormNavigation from "./components/form-navigation"
import RxInfoForm from "./components/rx-info-form"
import ProductList from "./components/product-list"
import { useFormValidation } from "./hooks/useFormValidation"
import { usePrescriptionLogic } from "./hooks/usePrescriptionLogic"

import type { AvailablePath, Variant } from "../../contexts/customizer/types"
import PrescriptionUpload from "./components/prescription-upload"

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

  const { isRxAble, setRxAble, rxInfo, rxInfoDispatch } = useRxInfo()

  const [prescriptionEntry, setPrescriptionEntry] = useState<
    "TYPED" | "UPLOADED"
  >(rxInfo?.uploadedFile?.url ? "UPLOADED" : "TYPED")

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
  const {
    verifyForm,
    verifyUpload,
    isNowValid,
    clearErrors,
    removeChildNodes,
  } = useFormValidation({
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
    if (prescriptionEntry === "TYPED" && verifyForm()) {
      setIsFormValid(true)
      setCurrentStep(currentStep + num)
      return
    }
    // uploaded prescription
    if (prescriptionEntry === "UPLOADED" && verifyUpload()) {
      if (rxInfo.uploadedFile) {
        setIsFormValid(true)
        setCurrentStep(currentStep + num)
        return
      }
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
    [currentCollection]
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
      if (foundVariant) {
        variantToSet = selectedVariants[`step${currentStep}`]
      }
      // check if price has changed due to discount
      if (
        foundVariant &&
        foundVariant.price !== selectedVariants[`step${currentStep}`].price
      ) {
        variantToSet = foundVariant
      }
    }
    handleChange(null, variantToSet, true)
  }, [allVariants, currentCollection])

  useEffect(() => {
    setCurrentCollection(selectedCollectionPath)
  }, [selectedCollectionPath])

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

      {isRxAble && (
        <div className="prescription-entry-method">
          <span>How would you like to provide your prescription?</span>
          <input
            type="radio"
            name="prescriptionEntry"
            value="TYPED"
            checked={prescriptionEntry === "TYPED"}
            onChange={() => setPrescriptionEntry("TYPED")}
          />{" "}
          Enter Manually
          <input
            type="radio"
            name="prescriptionEntry"
            value="UPLOADED"
            checked={prescriptionEntry === "UPLOADED"}
            onChange={() => setPrescriptionEntry("UPLOADED")}
          />{" "}
          Upload Prescription
        </div>
      )}

      {prescriptionEntry === "UPLOADED" && isRxAble && !isReaders && (
        <PrescriptionUpload
          uploadedFile={rxInfo.uploadedFile}
          isNowValid={() => isNowValid(true)}
        />
      )}
      {prescriptionEntry === "TYPED" && isRxAble && !isReaders ? (
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

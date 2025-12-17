import { useRef, ChangeEvent } from "react"

type RxInfo = {
  right: {
    sph: string
    cyl: string
    axis: string
    add: string
    pd: string
  }
  left: {
    sph: string
    cyl: string
    axis: string
    add: string
    pd: string
  }
  lensPower?: string
}

type UseFormValidationProps = {
  isNonPrescription: boolean
  isReaders: boolean
  rxInfo: RxInfo
  messageRef: React.MutableRefObject<any>
  continueBtn: React.MutableRefObject<HTMLButtonElement | null>
  errorRefs: React.MutableRefObject<any>
}

export const useFormValidation = ({
  isNonPrescription,
  isReaders,
  rxInfo,
  messageRef,
  continueBtn,
  errorRefs,
}: UseFormValidationProps) => {
  const removeChildNodes = (parent: HTMLElement) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  }

  const verifyForm = (): boolean => {
    let isValid = true
    let messages: HTMLElement[] = []
    if (messageRef.current) removeChildNodes(messageRef.current)

    if (isNonPrescription) {
      return isValid
    }

    if (isReaders) {
      if (rxInfo.lensPower === "") {
        let node = document.createElement("li")
        node.textContent = "Please add a lens power"
        node.setAttribute("id", "readers-error")
        messages.push(node)
        isValid = false
        if (!isValid && messageRef.current) {
          for (let i = 0; i < messages.length; ++i) {
            messageRef.current?.appendChild(messages[i])
          }
        }
        if (!isValid) {
          continueBtn.current?.classList.add("disable")
        }
        return isValid
      } else {
        return isValid
      }
    }

    if (
      rxInfo.right.sph === "0.00" &&
      rxInfo.left.sph === "0.00" &&
      rxInfo.right.cyl === "0.00" &&
      rxInfo.left.cyl === "0.00"
    ) {
      let node = document.createElement("li")
      node.textContent =
        "Please add prescription information or go back and choose non-prescription"
      node.setAttribute("id", "error-general")
      messages.push(node)
      isValid = false
    }

    if (rxInfo.right.cyl !== "0.00" && rxInfo.right.axis === "") {
      let node = document.createElement("li")
      node.textContent = "Please add an axis value for right eye"
      node.setAttribute("id", "error-right-axis")
      messages.push(node)
      errorRefs.current["select-right-axis"].classList.add("select-error")
      isValid = false
    }

    if (rxInfo.left.cyl !== "0.00" && rxInfo.left.axis === "") {
      let node = document.createElement("li")
      node.textContent = "Please add an axis value for left eye"
      node.setAttribute("id", "error-left-axis")
      messages.push(node)
      errorRefs.current["select-left-axis"].classList.add("select-error")
      isValid = false
    }

    if (!isValid && messageRef.current) {
      for (let i = 0; i < messages.length; ++i) {
        messageRef.current?.appendChild(messages[i])
      }
    }

    if (!isValid) {
      continueBtn.current?.classList.add("disable")
    }

    return isValid
  }

  const isNowValid = (isFormValid: boolean) => {
    // will re enable the button once all form errors are cleared
    // if (isFormValid) return // why is this here?
    if (!messageRef.current.hasChildNodes()) {
      continueBtn.current?.classList.remove("disable")
    }
  }

  const clearErrors = (evt: ChangeEvent<HTMLSelectElement>) => {
    let id: string = evt.target.id

    if (evt.target.name === "lens-power") {
      // reader's table
      let msg = messageRef.current.querySelector("#readers-error")
      if (msg) msg.remove()
    }

    // disable axis whether a cyl value is present or not
    if (id.includes("cyl")) {
      let subId = id.split("-")[0]
      if (evt.target.value !== "0.00") {
        errorRefs.current[`select-${subId}-axis`].classList.remove("disable")
        return
      }
      errorRefs.current[`select-${subId}-axis`].classList.add("disable")
      errorRefs.current[`select-${subId}-axis`].querySelector("select").value =
        ""
    }

    const generalErrors: string[] = [
      "right-sph",
      "right-cyl",
      "left-sph",
      "left-cyl",
    ]

    if (id.includes("axis")) {
      evt.target.closest(".rx-select")?.classList.remove("select-error")
    }

    if (id.includes("cyl") && evt.target.value === "0.00") {
      let subId = id.split("-")[0]
      errorRefs.current[`select-${subId}-axis`].classList.remove("select-error")
      let msg = messageRef.current.querySelector(`#error-${subId}-axis`)
      if (msg) msg.remove()
    }

    if (generalErrors.indexOf(id) > -1) {
      let msg = messageRef.current.querySelector("#error-general")
      if (msg) msg.remove()
    }

    let msg = messageRef.current.querySelector(`#error-${id}`)
    if (msg) msg.remove()
  }

  return {
    verifyForm,
    isNowValid,
    clearErrors,
    removeChildNodes,
  }
}

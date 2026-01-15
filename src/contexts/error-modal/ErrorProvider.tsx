import React, { createContext, ReactNode, useState, useMemo } from "react"
import ErrorModalContext from "./context"

export const ErrorModalProvider = ({ children }: { children: ReactNode }) => {
  const [errorModalIsOpen, setErrorModalIsOpen] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [cb, setCb] = useState<any>(undefined)

  const renderErrorModal = (
    error: string = "Something Went Wrong",
    callback: any = undefined
  ) => {
    if (typeof error === "function") {
      setCb(() => error)
    } else {
      setErrorMsg(error)
      if (callback) {
        setCb(() => callback)
      } else {
        setCb(undefined)
      }
    }
    setErrorModalIsOpen(true)
  }

  const isBrowser = typeof window !== "undefined"
  if (isBrowser) window.renderErrorModal = renderErrorModal

  const closeErrorModal = () => {
    setErrorModalIsOpen(false)
  }

  const onAfterOpen = (cb: any) => cb

  const onAfterClose = () => {
    if (cb) cb()
  }

  const value = useMemo(
    () => ({
      errorModalIsOpen,
      renderErrorModal,
      closeErrorModal,
      onAfterOpen,
      onAfterClose,
      errorMsg,
    }),
    [errorModalIsOpen, errorMsg]
  )

  return (
    <ErrorModalContext.Provider value={value}>
      {children}
    </ErrorModalContext.Provider>
  )
}

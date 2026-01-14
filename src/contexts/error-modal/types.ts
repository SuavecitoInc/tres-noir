export interface DefaultContext {
  errorModalIsOpen: boolean
  renderErrorModal: (error?: string, callback?: any) => void
  closeErrorModal: () => void
  onAfterOpen: (cb: any) => void
  onAfterClose: (cb: any) => void
  errorMsg: string
}

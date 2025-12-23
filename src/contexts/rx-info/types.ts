export interface rxDetails {
  sph: string
  cyl: string
  axis: string
  add: string
  pd: string
}

export interface rxType {
  right: rxDetails
  left: rxDetails
  lensPower?: string
  uploadedFile?: null | {
    id: string
    url: string
  }
}

export interface DefaultContextType {
  isRxAble: boolean
  rxInfo: rxType
  rxInfoDispatch: React.Dispatch<any>
  setRxAble: (isRxAble: boolean) => void
}

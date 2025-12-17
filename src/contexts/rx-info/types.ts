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
}

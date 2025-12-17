import { createContext } from "react"
import type { rxType } from "./types"

const rxInit: rxType = {
  right: {
    sph: "0.00",
    cyl: "0.00",
    axis: "",
    add: "",
    pd: "63.0",
  },
  left: {
    sph: "0.00",
    cyl: "0.00",
    axis: "",
    add: "",
    pd: "63.0",
  },
  lensPower: "",
}

export const defaultContext = {
  isRxAble: false,
  rxInfo: rxInit,
  rxInfoDispatch: Dispatch => {},
  setRxAble: (isRxAble: boolean) => {},
}

export const RxInfoContext = createContext(defaultContext)

export default RxInfoContext

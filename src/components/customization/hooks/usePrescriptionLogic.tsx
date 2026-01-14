import { ChangeEvent } from "react"

type RxInfoDispatch = {
  type: string
  payload: string
}

type UsePrescriptionLogicProps = {
  rxInfoDispatch: (action: RxInfoDispatch) => void
  clearErrors: (evt: ChangeEvent<HTMLSelectElement>) => void
  isNowValid: (isFormValid: boolean) => void
}

export const usePrescriptionLogic = ({
  rxInfoDispatch,
  clearErrors,
  isNowValid,
}: UsePrescriptionLogicProps) => {
  const handleRx = (evt: ChangeEvent<HTMLSelectElement>) => {
    clearErrors(evt)
    rxInfoDispatch({ type: evt.target.id, payload: evt.target.value })
    isNowValid(false)
  }

  const range = (
    start: number,
    end: number,
    step: number,
    id: string
  ): string[] => {
    const arr: string[] = []
    const format: number = step % 1 === 0 ? 0 : step === 0.5 ? 1 : 2
    for (let i = start; i < end + step; i += step) {
      arr.push(i.toFixed(format))
      if (i === 0 && id.includes("sph")) arr.push("Plano")
    }
    return arr
  }

  return {
    handleRx,
    range,
  }
}

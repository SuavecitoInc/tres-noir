import React from "react"

type FormNavigationProps = {
  handleSteps: (num: number) => void
  continueBtn: React.RefObject<HTMLButtonElement | null>
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  handleSteps,
  continueBtn,
}) => {
  return (
    <div className="row button-row">
      <button type="button" onClick={() => handleSteps(-1)}>
        GO BACK
      </button>

      <button type="button" onClick={() => handleSteps(1)} ref={continueBtn}>
        CONTINUE
      </button>
    </div>
  )
}

export default FormNavigation

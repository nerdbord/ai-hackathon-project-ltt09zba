'use client'

import { useState } from 'react'
import ApprovedIcon from './ApprovedIcon'

interface CheckboxProps {
  value: string
}

const Checkbox = ({ value }: CheckboxProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const handleOnClick = () => {
    setIsClicked(!isClicked)
  }
  return (
    <button
      type="button"
      className={
        !isClicked
          ? 'hover:border-checktext-checkboxHover flex cursor-pointer rounded-3xl border border-primary px-5 py-2 text-lg font-semibold text-primary hover:text-checkboxHover active:border-inputFocus active:text-inputFocus '
          : 'hover:border-checktext-checkboxHover flex cursor-pointer items-center rounded-3xl border border-primary bg-primary px-5 py-2 text-lg font-semibold text-white hover:text-white active:bg-inputFocus '
      }
      onClick={handleOnClick}
    >
      {isClicked && (
        <span>
          <ApprovedIcon />
        </span>
      )}
      {value}
    </button>
  )
}

export default Checkbox

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
          ? 'hover:border-checktext-checkboxHover flex cursor-pointer gap-1 rounded-3xl border border-primary px-4 py-2 font-semibold text-primary hover:text-checkboxHover active:border-inputFocus active:text-inputFocus md:text-lg xl:px-5 '
          : 'hover:border-checktext-checkboxHover flex cursor-pointer items-center gap-1 rounded-3xl border border-primary bg-primary px-4 sm:px-5 py-2 md:text-lg font-semibold text-white hover:text-white active:bg-inputFocus '
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

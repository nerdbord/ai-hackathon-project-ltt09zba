'use client'

import { useState } from 'react'
import ApprovedIcon from './ApprovedIcon'
import { Payload } from '@/app/utils/payload'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'

interface CheckboxProps {
  onRegister: UseFormSetValue<Payload>
  onGetValues: UseFormGetValues<Payload>
  value: string
}

const Checkbox = ({ value, onRegister, onGetValues }: CheckboxProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const handleOnClick = () => {
    setIsClicked(!isClicked)
    if (!isClicked) {
      onRegister('checkboxes', [...onGetValues('checkboxes'), value])
    } else {
      onRegister(
        'checkboxes',
        onGetValues('checkboxes').filter((checkbox) => checkbox !== value)
      )
    }
  }
  return (
    <button
      type="button"
      className={
        !isClicked
          ? 'hover:border-checktext-checkboxHover flex cursor-pointer gap-1 rounded-3xl border border-primary px-4 py-2 font-semibold text-primary hover:text-checkboxHover active:border-inputFocus active:text-inputFocus md:text-lg xl:px-5 '
          : 'hover:border-checktext-checkboxHover flex cursor-pointer items-center gap-1 rounded-3xl border border-primary bg-primary px-4 py-2 font-semibold text-white hover:text-white active:bg-inputFocus sm:px-5 md:text-lg '
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

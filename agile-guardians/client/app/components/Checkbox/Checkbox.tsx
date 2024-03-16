'use client'

import { useState } from 'react'

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
          ? 'cursor-pointer rounded-3xl border border-primary px-5 py-2 text-lg font-semibold text-primary'
          : 'cursor-pointer rounded-3xl border border-primary bg-primary px-5 py-2 text-lg font-semibold text-white '
      }
      onClick={handleOnClick}
    >
      {value}
    </button>
  )
}

export default Checkbox

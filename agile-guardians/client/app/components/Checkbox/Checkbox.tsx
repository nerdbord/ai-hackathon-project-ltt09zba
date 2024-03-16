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
    <input
      readOnly
      type="text"
      className="border-primary text-primary w-[100px] cursor-pointer rounded-[8px] border text-lg font-semibold"
      onClick={handleOnClick}
      value={value}
    />
  )
}

export default Checkbox

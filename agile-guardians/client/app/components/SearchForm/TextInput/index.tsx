import Image from 'next/image'
import errorImg from '../../../../public/error.svg'
import { UseFormSetValue } from 'react-hook-form'
import { ChangeEvent } from 'react'
import { Payload } from '@/app/utils/payload'

interface TextInputProps {
  onRegister: UseFormSetValue<Payload>
}

const TextInput = ({ onRegister }: TextInputProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onRegister('search', e.target.value)
  }
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="search" className="text-base font-semibold ">
        Produkt<span className="text-error">*</span>
      </label>
      <input
        type="text"
        id="search"
        autoComplete="off"
        className="h-[48px] w-[300px] cursor-pointer rounded-lg border border-placeholder px-4 py-3 font-semibold text-input focus:border-2 focus:border-inputFocus focus:outline-none focus:placeholder:text-input sm:w-[320px]"
        placeholder="Wpisz nazwę produktu"
        onChange={(e) => handleOnChange(e)}
      />
      <div className="grid h-[32px] items-center rounded-lg bg-errorLight pl-3 sm:w-[320px]">
        <p role="alert" className="flex gap-1 text-sm font-normal text-error">
          <Image src={errorImg} alt="Error indicator" />
          Nie wpisano nazwy produktu
        </p>
      </div>
    </div>
  )
}

export default TextInput

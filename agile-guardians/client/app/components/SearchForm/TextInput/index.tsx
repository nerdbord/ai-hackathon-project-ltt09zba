import Image from 'next/image'
import errorImg from '../../../../public/error.svg'

const TextInput = () => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="search" className="text-base font-semibold ">
        Produkt<span className="text-error">*</span>
      </label>
      <input
        type="text"
        id="search"
        autoComplete="off"
        className="h-[48px] w-[320px] cursor-pointer rounded-lg border border-placeholder px-4 py-3 font-semibold text-input focus:border-2 focus:border-inputFocus focus:outline-none focus:placeholder:text-input"
        placeholder="Wpisz nazwę produktu"
      />
      <div className="grid h-[32px] w-[320px] items-center rounded-lg bg-errorLight pl-3">
        <p role="alert" className="flex gap-1 text-sm font-normal text-error">
          <Image src={errorImg} alt="Error indicator" />
          Nie wpisano nazwy produktu
        </p>
      </div>
    </div>
  )
}

export default TextInput

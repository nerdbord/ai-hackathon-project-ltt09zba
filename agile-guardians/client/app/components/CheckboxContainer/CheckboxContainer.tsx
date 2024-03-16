import Image from 'next/image'
import { PropsWithChildren } from 'react'
import errorImg from '../../../public/error.svg'

const CheckboxContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl font-normal ">Sprawdź produkt pod kątem:</p>
      <div className="flex gap-2">{children}</div>
      <div className="grid h-[32px] w-[320px] items-center rounded-lg bg-errorLight pl-3">
        <p role="alert" className="flex gap-1 text-sm font-normal text-error">
          <Image src={errorImg} alt="Error indicator" />
          Nie wybrano kategorii
        </p>
      </div>
    </div>
  )
}

export default CheckboxContainer

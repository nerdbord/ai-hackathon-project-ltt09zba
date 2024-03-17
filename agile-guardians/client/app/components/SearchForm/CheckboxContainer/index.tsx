import Image from 'next/image'
import errorImg from '../../../../public/error.svg'

type CheckboxContainerProps = {
  children: React.ReactNode
  error: boolean
}

const CheckboxContainer = ({ children, error }: CheckboxContainerProps) => {
  return (
    <div className="mb-[52px] flex flex-col gap-2">
      <p className="text-2xl font-normal ">Sprawdź produkt pod kątem:</p>
      <div className="flex flex-wrap gap-2">{children}</div>
      {error && (
        <div className="grid h-[32px] items-center rounded-lg bg-errorLight pl-3 sm:w-[320px]">
          <p role="alert" className="flex gap-1 text-sm font-normal text-error">
            <Image src={errorImg} alt="Error indicator" />
            Nie wybrano kategorii
          </p>
        </div>
      )}
    </div>
  )
}

export default CheckboxContainer

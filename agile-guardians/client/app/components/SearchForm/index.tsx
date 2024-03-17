'use client'
import Image from 'next/image'
import search from '../../../public/search.jpg'
import TextInput from './TextInput'
import Checkbox from './Checkbox'
import CheckboxContainer from './CheckboxContainer'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Payload } from '@/app/utils/payload'
import { useEffect } from 'react'

const SearchForm = () => {
  const { handleSubmit, setValue, getValues } = useForm<Payload>()
  const onSubmit: SubmitHandler<Payload> = (data: Payload) => console.log(data)

  useEffect(() => {
    setValue('search', '')
    setValue('checkboxes', [])
  }, [])

  return (
    <form
      className="flex justify-between rounded-lg bg-white shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mx-auto flex flex-col gap-3 rounded-l-lg bg-white px-4 py-5 sm:mx-0 sm:px-6">
        <h3 className="text-3xl font-semibold xl:text-4xl">Sprawdź oferty</h3>
        <TextInput onRegister={setValue} />
        <CheckboxContainer>
          {['manipulacja', 'ekologia', 'jakość'].map((checkbox) => (
            <Checkbox
              value={checkbox}
              key={checkbox}
              onRegister={setValue}
              onGetValues={getValues}
            />
          ))}
        </CheckboxContainer>
        <button
          type="submit"
          className="h-[56px] w-full rounded-[8px] bg-primary text-lg font-semibold text-white hover:bg-inputFocus lg:w-[103px]"
        >
          Sprawdź
        </button>
      </div>
      <Image
        src={search}
        width={612}
        height={444}
        alt="form image"
        className="hidden w-[550px] overflow-hidden rounded-r-lg sm:block lg:w-auto"
      />
    </form>
  )
}

export default SearchForm

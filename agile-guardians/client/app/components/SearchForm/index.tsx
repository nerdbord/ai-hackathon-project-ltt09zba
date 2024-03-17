'use client'

import Checkbox from './Checkbox'
import CheckboxContainer from './CheckboxContainer'
import { FormEvent, useState } from 'react'
import TextInput from './TextInput'
import searchImage from '../../../public/search.jpg'
import Image from 'next/image'

const SearchForm = () => {
  const [search, setSearch] = useState<string>('')
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>([])
  const [checkboxError, setCheckboxError] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const [result, setResult] = useState<
    { search: string; checkedBoxes: string[] }[]
  >([])

  const handleCheckboxChange = (value: string) => {
    setCheckedBoxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (search === '' && checkedBoxes.length === 0) {
      setSearchError(true)
      setCheckboxError(true)
    } else if (checkedBoxes.length === 0 && search !== '') {
      setCheckboxError(true)
      setSearchError(false)
    } else if (search === '' && checkedBoxes.length !== 0) {
      setSearchError(true)
      setCheckboxError(false)
    } else {
      setCheckboxError(false)
      setSearchError(false)
      setResult([{ search, checkedBoxes }])
    }
  }

  console.log(result)

  return (
    <form
      className="flex justify-between rounded-lg bg-white shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mx-auto flex flex-col rounded-l-lg bg-white px-4 py-5 sm:mx-0 sm:px-6">
        <h3 className="mb-6 text-3xl font-semibold xl:text-4xl">
          Sprawdź oferty
        </h3>
        <TextInput search={search} setSearch={setSearch} error={searchError} />
        <CheckboxContainer error={checkboxError}>
          {['manipulacja', 'ekologia', 'jakość'].map((checkbox) => (
            <Checkbox
              value={checkbox}
              key={checkbox}
              onChange={handleCheckboxChange}
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
        src={searchImage}
        width={612}
        height={444}
        alt="form image"
        className="hidden w-[550px] overflow-hidden rounded-r-lg sm:block lg:w-auto"
      />
    </form>
  )
}

export default SearchForm

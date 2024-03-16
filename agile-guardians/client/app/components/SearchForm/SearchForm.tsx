import Image from 'next/image'
import search from '../../../public/search.jpg'
import TextInput from './TextInput/TextInput'
import Checkbox from './Checkbox/Checkbox'
import CheckboxContainer from './CheckboxContainer/CheckboxContainer'

const SearchForm = () => {
  return (
    <form className="flex justify-between bg-white shadow-md">
      <div className="flex flex-col gap-3 py-5 pl-6">
        <h3 className="text-4xl font-semibold">Sprawdź oferty</h3>
        <TextInput />
        <CheckboxContainer>
          {['manipulacja', 'ekologia', 'jakość'].map((checkbox) => (
            <Checkbox value={checkbox} key={checkbox} />
          ))}
        </CheckboxContainer>
        <button
          type="submit"
          className="h-[56px] w-[103px] rounded-[8px] bg-primary text-lg font-semibold text-white hover:bg-inputFocus"
        >
          Sprawdź
        </button>
      </div>
      <Image src={search} alt="" />
    </form>
  )
}

export default SearchForm

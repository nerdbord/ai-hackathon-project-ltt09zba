import Image from 'next/image'
import search from '../../../public/search.jpg'
import TextInput from '../TextInput/TextInput'
import Checkbox from '../Checkbox/Checkbox'

const SearchForm = () => {
  return (
    <form className="flex justify-between bg-white shadow-md">
      <div className="flex flex-col py-5 pl-6">
        <h3 className="text-4xl font-semibold">Sprawdź oferty</h3>
        <TextInput />
        <div>
          <p>Sprawdź produkt pod kątem</p>
          <div>
            <Checkbox value="manipulacja" />
            <Checkbox value="ekologia" />
            <Checkbox value="jakość" />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary h-[56px] w-[103px] rounded-[8px] text-lg font-semibold text-white"
        >
          Sprawdź
        </button>
      </div>
      <Image src={search} alt="" />
    </form>
  )
}

export default SearchForm

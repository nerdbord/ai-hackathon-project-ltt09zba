import Image from 'next/image'
import logo from '../../../public/logo.svg'

const LogoHeader = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4">
        <Image src={logo} alt="App logo" className='w-16 sm:w-auto' />
      </div>
    </header>
  )
}

export default LogoHeader

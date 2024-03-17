import Image from 'next/image'
import logo from '../../../public/logo.svg'

const LogoHeader = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <Image src={logo} alt="App logo" />
      </div>
    </header>
  )
}

export default LogoHeader

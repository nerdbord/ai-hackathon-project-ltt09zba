import Image from 'next/image'
import logo from '../../../public/logo.svg'

const LogoHeader = () => {
  return (
    <header className="bg-white pl-[120px]">
      <Image src={logo} alt="App logo" />
    </header>
  )
}

export default LogoHeader

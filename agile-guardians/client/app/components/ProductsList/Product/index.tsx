import Image from 'next/image'
import searchImg from '../../../../public/search.jpg'
import CloseButton from './CloseButton'
import RecommendedBadge from '../RecommendedBadge'
import Info from '../Info'
import Link from 'next/link'

interface ProductProps {
  title: string
  img?: string
  manipulation: string
  ecology: string
  quality: string
  index: number
  url: string
}

const Product = ({
  title,
  manipulation,
  ecology,
  quality,
  index,
  url,
}: ProductProps) => {
  return (
    <article className="relative flex h-[464px] rounded-lg bg-white shadow-md">
      <CloseButton />
      <Image
        src={searchImg}
        alt="Product img"
        width="464"
        height="464"
        className="rounded-l-lg"
      />
      <div className="flex flex-col gap-4 p-6">
        {index === 0 && <RecommendedBadge />}
        <h4 className="text-2xl font-semibold ">{title}</h4>
        <Info title="Manipulacja" content={manipulation} />
        <Info title="Ekologia" content={ecology} />
        <Info title="Jakość" content={quality} />
        <Link
          href={url}
          className="grid h-[36px] w-[146px] place-items-center rounded-md bg-primary text-sm text-white hover:bg-checkboxHover"
        >
          Przejdź do produktu
        </Link>
      </div>
    </article>
  )
}

export default Product

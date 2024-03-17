import RecommendedBadge from '../RecommendedBadge'
import Info from '../Info'
import Link from 'next/link'

interface ProductProps {
  title: string
  img?: string
  manipulation?: string
  ecology?: string
  quality?: string
  index: number
}

const Product = ({
  title,
  manipulation,
  img,
  ecology,
  quality,
  index,
}: ProductProps) => {
  return (
    <article className="flex flex-col rounded-lg bg-white shadow-md lg:flex-row">
      <img
        src={img || '/img/noImage.png'}
        alt="Product img"
        width="464"
        height="464"
        className="max-h-[464px] sm:min-w-[464px] rounded-t-lg sm:rounded-l-lg sm:rounded-r-none object-contain"
      />
      <div className="relative flex flex-col gap-2 p-4 sm:gap-3 sm:p-6">
        {index === 0 && <RecommendedBadge />}
        <h4 className="text-lg font-semibold sm:text-2xl ">{title}</h4>
        {manipulation && <Info title="Manipulacja" content={manipulation} />}
        {ecology && <Info title="Ekologia" content={ecology} />}
        {quality && <Info title="Jakość" content={quality} />}
        <Link
          rel="noopener noreferrer"
          href="/"
          className="grid h-[36px] place-items-center rounded-md bg-primary text-sm text-white hover:bg-checkboxHover sm:w-[146px]"
        >
          Przejdź do produktu
        </Link>
      </div>
    </article>
  )
}

export default Product

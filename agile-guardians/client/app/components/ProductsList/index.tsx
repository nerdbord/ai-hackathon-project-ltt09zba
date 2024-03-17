'use client'

import { useQuery } from 'react-query'
import Product from './Product'
import { v4 as uuid } from 'uuid'
import { getAllegroProducts } from '@/app/lib/getAllegroProducts'
import { getChatGptResponses } from '@/app/lib/getChatGptResponses'

const dummyProps = {
  title: 'Horizontal Card with Image & Actions',
  img: '',
  manipulation:
    'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt sodales id. Elit interdum vel nisi, in enim sagittis at. Netus sagittis eleifend aliquet urna quis.',
  ecology:
    'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt sodales id. Elit interdum vel nisi, in enim sagittis at. Netus sagittis eleifend aliquet urna quis.',
  quality:
    'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt sodales id. Elit interdum vel nisi, in enim sagittis at. Netus sagittis eleifend aliquet urna quis.',
  url: '/',
}

type ProductsListProps = {
  result: { search: string; checkedBoxes: string[] }[]
}

const ProductsList = ({ result }: ProductsListProps) => {
  const {
    isLoading,
    data: allegroProducts,
    isError,
  } = useQuery(['allegro-products', result?.[0]?.search], getAllegroProducts)

  console.log(allegroProducts?.slice(0, 5))

  const criteria = {
    manipulacja: result?.[0]?.checkedBoxes.includes('manipulacja'),
    ekologia: result?.[0]?.checkedBoxes.includes('ekologia'),
    jakość: result?.[0]?.checkedBoxes.includes('jakość'),
  }

  const slicedAllegroProducts = allegroProducts?.slice(0, 5)

  const {
    isLoading: loading,
    data: chatgptData,
    isError: error,
  } = useQuery(
    ['chatgpt', { slicedAllegroProducts, criteria }],
    getChatGptResponses,
    { enabled: !!slicedAllegroProducts }
  )

  console.log(chatgptData)

  if (!result?.[0]?.search || !result?.[0]?.checkedBoxes.length) {
    return null
  }

  if (isLoading || loading) {
    return <p>Ładowanie...</p>
  }

  if (isError || error) {
    return <p>Wystąpił błąd</p>
  }

  if (slicedAllegroProducts) {
    return (
      <section className="flex flex-col gap-6 bg-transparent">
        <h3 className="text-[40px] font-semibold">Znalezione oferty</h3>
        {slicedAllegroProducts.map((element, index) => (
          <Product
            index={index}
            key={uuid()}
            title={element.name}
            img={element.images?.[0]}
            ecology={dummyProps.ecology}
            manipulation={dummyProps.manipulation}
            quality={dummyProps.quality}
          />
        ))}
      </section>
    )
  }
}

export default ProductsList

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

  const slicedAllegroProducts = allegroProducts?.slice(0, 5)

  const prompt = `Czy mozesz ocenic te 5 produktów na podstawie nazwy i opisu? ${slicedAllegroProducts?.map(({ description, name }, index) => `${index + 1}. Nazwa: ${name}, Opis: ${description || 'Brak opisu'}`)}. Pod względem: ${result?.[0]?.checkedBoxes?.join(' i ') || 'Brak parametrów'} w skali od 1-10 i odpowiedz w formie tablicy obiektów ukrytej w stringu, gdzie każdy obiekt będzie wyglądał w następujący sposób {nazwa: Tutaj dodaj nazwę produktu, ocena_produktu: tutaj dodaj ocenę produktu w skali od 1-10, manipulacja: tutaj dodaj opis a propos manipulacji, ekologia: tutaj dodaj opis a propos ekologii, jakość: tutaj dodaj opis a propos jakości }?`

  const {
    isLoading: loading,
    data: chatgptData,
    isError: error,
  } = useQuery(['chatgpt', prompt], getChatGptResponses, {
    enabled: !!slicedAllegroProducts,
  })

  const va = chatgptData?.length > 0 && JSON.parse(chatgptData)

  let updatedChatgptData

  if (Array.isArray(va)) {
    updatedChatgptData = va.map((item, index) => {
      const image = slicedAllegroProducts?.[index]?.images[0]
      return { ...item, image }
    })
  }

  if (!result?.[0]?.search || !result?.[0]?.checkedBoxes.length) {
    return null
  }

  if (isLoading || loading) {
    return <p>Ładowanie...</p>
  }

  if (isError || error) {
    return <p>Wystąpił błąd</p>
  }

  if (chatgptData.length > 0) {
    return (
      <section className="flex flex-col gap-6 bg-transparent">
        <h3 className="text-[40px] font-semibold">Znalezione oferty</h3>
        {updatedChatgptData
          ?.sort((a, b) => b.ocena_produktu - a.ocena_produktu)
          .map((element, index) => (
            <Product
              index={index}
              key={uuid()}
              rating={element.ocena_produktu}
              title={element.nazwa}
              img={element.image}
              ecology={element.ekologia}
              quality={element.jakość}
              manipulation={element.manipulacja}
            />
          ))}
      </section>
    )
  }
}

export default ProductsList

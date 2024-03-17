import { wait } from './wait'

type Product = {
  name: string
  description: string
  images: string[]
}

export const getAllegroProducts = async ({ queryKey }: any) => {
  await wait(500)

  const [key, search] = queryKey
  console.log('search', search)

  const res = await fetch(
    `http://localhost:3000/search-products?phrase=${search}`
  )

  if (!res.ok) throw new Error(res.statusText)

  const data = await res.json() as Product[]

  return data
}

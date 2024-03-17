import { wait } from './wait'

export const getChatGptResponses = async ({ queryKey }: any) => {
  await wait(500)

  const [key, { slicedAllegroProducts, criteria }] = queryKey
  
  const result = {...criteria, ...slicedAllegroProducts}
  console.log(JSON.stringify(result))

  const res = await fetch('http://localhost:5000/api/chatgpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  })

  if (!res.ok) throw new Error(res.statusText)

  const data = await res.json()

  return data
}

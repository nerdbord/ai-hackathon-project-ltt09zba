import { wait } from './wait'

export const getChatGptResponses = async ({ queryKey }: any) => {
  await wait(500)

  const [key, prompt] = queryKey

  const res = await fetch('http://localhost:5000/api/chatgpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  })

  if (!res.ok) throw new Error(res.statusText)

  const data = await res.json()

  return data
}

import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  const url = 'https://training.nerdbord.io/api/v1/openai/chat/completions'
  const apiKey = process.env.OPENAI_API_KEY
  const { message } = await req.json()

  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: message,
      },
    ],
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${apiKey}`,
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const message = data.choices[0].message.content

    return NextResponse.json(
      message.slice(
        message.indexOf('['),
        message.indexOf(']') + 1
      )
    )
  } catch (error: any) {
    return NextResponse.json(error.message )
  }
}

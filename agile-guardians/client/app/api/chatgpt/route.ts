import { NextResponse } from 'next/server'

/*
example of passed body to req when invoking route handler:
{
  "message": "Can you please value value this product based on environmental sustainability from 1-10(add some info on why you rated it that way) and return it in an array of objects like code but still within the main string with each object having the name a rating and why uo rated it?: name: PODSTAWKA PODKŁADKA CHŁODZĄCA POD LAPTOP-A LAPTOPA LAPTOP NOTEBOOK 10-19, description: PODSTAWKA PODKŁADKA CHŁODZĄCA POD LAPTOP-A LAPTOPA LAPTOP NOTEBOOK 10-19''✅ Zalety: ✔ Kompatybilna z laptopami o przekątnej 10-19\" ✔ Wydajny i cichy wentylator z podświetleniem LED ✔ Duży wentylator - 135mm✅ Ergonomiczny design Podstawka chłodząca przeznaczona do laptopów o przekątnej do 19” wyróżniająca się ergonomicznym kształtem. Uniwersalne zastosowanie  Nie wymaga zewnętrznych źródeł zasilania – zasilana z portu USB notebooka.  Kompatybilna ze wszystkimi rodzajami notebooków od 10 do 19\" cali. Podstawka to moc korzyści m. in:  Trzymanie niskiej temperatury urządzenia Zabezpiecza przed przegrzaniem Uniemożliwia zapalenia się baterii Brak efektu spadku wydajności Uniemożliwia spalenie procesora Znacząco podnosi komfort pracy ✅ Wydajny wentylator Głównym wyróżnikiem podstawki jest wydajne chłodzenie, dzięki zastosowaniu jednego podświetlanego wentylatora o wielkości 135 mm, który równomiernie schładza laptop na całej powierzchni podstawki. Dzięki cichej pracy zapewniamy optymalne warunki pracy zarówno dla naszego laptopa jak i dla nas.⚙️ Dane techniczne:  Kompatybilność z laptopami: 10”-19” Ilość wentylatorów: 1 Wentylator: ø13,5cm (ø12,5cm śmigło) Prędkość obrotowa: 1000 obr./min. Przepływ powietrza: 20 CFM Poziom hałasu: ok. 20 dBA Podświetlany wentylator Materiał: ABS + metalowa siatka Zasilanie: 5 V; 500 mA (z portu USB) Wymiary: 330x250x40mm Waga: 327g"
}
*/

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

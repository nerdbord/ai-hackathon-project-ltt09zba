import './globals.css'
import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import LogoHeader from './components/LogoHeader'
import ReactQueryClientProvider from './components/ReactQueryClientProvider'

const source_pro = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600'] })

export const metadata: Metadata = {
  title: 'AI pomocnik zakupów',
  description:
    'Szybko i wygodnie sprawdź oferty pod kątem manipulacji, ekologii lub jakości dzięki AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="pl">
        <body className={`${source_pro.className} bg-background pb-5`}>
          <LogoHeader />
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  )
}

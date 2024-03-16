import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import './globals.css'
import LogoHeader from './components/LohoHeader/LogoHeader'

const source_pro = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600'] })

export const metadata: Metadata = {
  title: 'AI pomocnik zakupów',
  description: 'Nie trać czasu! Niech AI pomocnik zrobi zakupy za Ciebie!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className={`${source_pro.className} bg-background`}>
        <LogoHeader />
        {children}
      </body>
    </html>
  )
}

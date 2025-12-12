import type { Metadata } from 'next'
import { Roboto_Condensed } from 'next/font/google'
import './globals.css'
import NavBar from '@/app/componentes/NavBar';

const roboto = Roboto_Condensed({ weight: "600", subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quien falta',
  description: 'Busca o reserva una cancha.',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`max-h-screen h-screen`} cz-shortcut-listen="true">
        <NavBar />
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Roboto_Condensed } from 'next/font/google'
import './globals.css'
import NavBar from '@/app/componentes/NavBar';
import Handler from './handler';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''></link>
        <link href="https://fonts.googleapis.com/css2?family=Sora&display=swap" rel="stylesheet"></link>
      </head>
      <body className={`max-h-screen h-screen bg-white/60 outfit-font`} cz-shortcut-listen="true">
        {/* <NavBar /> */}
        <Handler>{children}</Handler>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter, Kanit } from 'next/font/google'
import './globals.css'
import NavBar from '@/app/componentes/NavBar';

const inter = Inter({ subsets: ['latin'] })
const kanit = Kanit({ weight: "400", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quien falta',
  description: 'Busca o reserva una cancha.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${kanit.className} min-h-screen`}>
        <NavBar />
        {children}
        <footer className='text-center mx-auto pt-2 pb-2 xl:pt-4 xl:pb-4.'>Hecho por Ulises Cortes</footer>
      </body>
    </html>
  )
}

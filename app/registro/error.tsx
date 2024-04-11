'use client'

import Link from "next/link"

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="h-screen pt-56. text-center flex flex-col justify-center items-center">
      <h2>{error.message}</h2>
      <button onClick={() => reset()} className="bg-black text-white hover:bg-yellow hover:text-black w-fit py-2 px-2 rounded-md mt-4">Intentar otra vez</button>
      <Link href={'/'} className="bg-black text-white hover:bg-brigthred w-fit py-2 px-2 rounded-md mt-4">Volver a inicio</Link>
    </div>
  )
}
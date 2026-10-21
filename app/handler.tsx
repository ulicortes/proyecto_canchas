'use client';

import { usePathname } from 'next/navigation';
import NavBar from './componentes/NavBar';
import { useEffect, useState } from 'react';
import { datos_admin } from './lib/metodos';

export default function Handler({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    async function buscarCookie() {
      const userCookie = await datos_admin(); // Reemplaza 'data' por el nombre de tu cookie
      setIsLoggedIn(!!userCookie);
    }
    buscarCookie();
  }, [pathname]);

  return (
    <main className='w-full h-full flex flex-col justify-between'>
      {!isLoginPage && isLoggedIn && <NavBar />}
      {children}
    </main>
  );
}
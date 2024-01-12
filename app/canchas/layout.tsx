import Link from 'next/link';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="pl-4 pt-2">
        <Link
          href="/"
          
          rel="noopener noreferrer"
        >
          <h5 className={`p-3. text-l text-left. ml-2. font-semibold`}>
            Volver
          </h5>
        </Link>
      </div>
      <div className="flex-grow p-2. md:overflow-y-auto md:p-2">{children}</div>
    </div>
  );
}
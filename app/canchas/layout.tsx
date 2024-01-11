import Link from 'next/link';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <Link
          href="/"
          className="group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h3 className={`p-3 text-2xl text-center font-semibold`}>
            Volver
          </h3>
        </Link>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
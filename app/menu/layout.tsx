import Link from 'next/link';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex-grow p-2. md:overflow-y-auto md:p-2">{children}</div>
    </div>
  );
}
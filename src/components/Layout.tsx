import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-gray-200">
      <header className="p-8 mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Johanna Lundström
        </h1>
        <p className="text-gray-600 mt-2">
          Portfolio
        </p>
        
        <nav className="mt-6">
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-700 hover:text-gray-900 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-gray-700 hover:text-gray-900 hover:underline">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="p-8">
        {children}
      </div>
    </main>
  );
}
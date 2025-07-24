import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'SecureSight - CCTV Incident Dashboard',
  description: 'Real-time CCTV incident monitoring and management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        {/* Navbar */}
        <header className="bg-gray-900 px-6 py-3 flex items-center justify-between border-b border-gray-700">
          {/* Left Section: Logo + Nav Links */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-lg">
               <span className="text-2xl">S</span> Secure Sight
            </div>

            <nav className="hidden md:flex items-center gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white">Dashboard</a>
              <a href="#" className="hover:text-white">Cameras</a>
              <a href="#" className="hover:text-white">Scenes</a>
              <a href="#" className="hover:text-white">Incidents</a>
              <a href="#" className="hover:text-white">Users</a>
            </nav>
          </div>

          {/* Right Section: User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right text-sm">
              <div className="font-semibold">Fiona Dsouza </div>
              <div className="text-gray-400">fionadsouza@securesight.com </div>
            </div>
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-700"
            />
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}

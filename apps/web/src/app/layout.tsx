import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto Portfolio",
  description: "Manage your crypto portfolio with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen bg-gray-100">
          <aside className="w-64 bg-white border-r">
            <div className="p-6">
              <h1 className="text-xl font-bold">CryptoDash</h1>
            </div>
            <nav className="mt-6">
              <a href="#" className="flex items-center px-6 py-2 text-gray-700 bg-gray-200">
                Dashboard
              </a>
              <a href="#" className="flex items-center px-6 py-2 mt-2 text-gray-600 hover:bg-gray-200">
                Assets
              </a>
              <a href="#" className="flex items-center px-6 py-2 mt-2 text-gray-600 hover:bg-gray-200">
                Settings
              </a>
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto">
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
              <h2 className="text-lg font-semibold text-gray-800">Portfolio Overview</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">User: Admin</span>
              </div>
            </header>
            <div className="p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

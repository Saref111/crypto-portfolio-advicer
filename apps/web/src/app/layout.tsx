import type { Metadata } from "next";
import { LayoutDashboard, PieChart, Settings, User } from "lucide-react";
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
      <body className="antialiased font-sans">
        <div className="flex h-screen bg-gray-50 text-gray-900">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">CryptoDash</h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg group"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg group transition-colors"
              >
                <PieChart className="w-4 h-4 text-gray-400 group-hover:text-gray-500" />
                Assets
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg group transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-400 group-hover:text-gray-500" />
                Settings
              </a>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
                  <p className="text-xs text-gray-500 truncate">admin@example.com</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-gray-200 shrink-0">
              <h2 className="text-lg font-semibold text-gray-800">Portfolio Overview</h2>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Notifications</span>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-gray-50/50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Vend Admin Dashboard - Powertel Communications',
  description: 'Professional admin dashboard for E-Vend and M-Commerce system managing electricity token vending in Zimbabwe',
  keywords: 'E-Vend, M-Commerce, Electricity, Tokens, Zimbabwe, Powertel, Admin Dashboard',
  authors: [{ name: 'Powertel Communications' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
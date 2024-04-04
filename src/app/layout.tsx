import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../../components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Shopping List',
    description: "Shopping is fun until it's not.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex flex-col h-lvh">
                    <Navigation />
                    <div className="flex w-lvw h-full justify-center items-center">{children}</div>
                </main>
            </body>
        </html>
    )
}

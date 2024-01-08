import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Secure Authentication',
  description: "This app keeps information safe with multiple layers of security. User can choose to verify the account through email, sign in with existing accounts from other apps like Google and Github, and even add an extra step of two factor authentication to increase the security of the account",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <link rel="icon" href="/shield.ico" sizes="any" />
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  )
}

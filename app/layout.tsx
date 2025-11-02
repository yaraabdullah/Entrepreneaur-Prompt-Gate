import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Entrepreneur Journey - Stage-by-Stage Prompt Generator',
  description: 'A guided approach to building your entrepreneurial project, stage by stage. Generate optimized prompts for each phase of your entrepreneurial journey.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


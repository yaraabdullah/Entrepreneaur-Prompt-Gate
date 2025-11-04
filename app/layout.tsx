import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

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
      <body>
        <LanguageProvider>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}


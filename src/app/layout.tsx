import './globals.css'
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata = {
  title: 'Psst - Ephemeral Chat',
  description: 'Whisper. Then vanish. Ephemeral, private conversations with no traces left behind.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${geist.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased font-sans max-w-screen-2xl mx-auto">
        {children}
      </body>
    </html>
  );
}

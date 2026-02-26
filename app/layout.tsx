import type { ReactNode } from 'react'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt">
      <body style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

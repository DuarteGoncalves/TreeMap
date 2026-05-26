import { MapOverlayProvider } from '@/components/map/MapOverlayProvider'
import type { ReactNode } from 'react'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt">
      <body style={{ margin: 0 }}>
        <MapOverlayProvider>{children}</MapOverlayProvider>
      </body>
    </html>
  )
}

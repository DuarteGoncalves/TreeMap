'use client'

import { createContext, useContext, useState, useCallback } from 'react'

type Overlay = {
  id: string
  element: React.ReactNode
}

type OverlayContextType = {
  addOverlay: (overlay: Overlay) => void
  removeOverlay: (id: string) => void
  overlays: Overlay[]
}

const OverlayContext = createContext<OverlayContextType | null>(null)

export function MapOverlayProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [overlays, setOverlays] = useState<Overlay[]>([])

  const addOverlay = useCallback((overlay: Overlay) => {
    setOverlays((prev) => [...prev, overlay])
  }, [])

  const removeOverlay = useCallback((id: string) => {
    setOverlays((prev) => prev.filter((o) => o.id !== id))
  }, [])

  return (
    <OverlayContext.Provider
      value={{ overlays, addOverlay, removeOverlay }}
    >
      {children}
    </OverlayContext.Provider>
  )
}

export function useMapOverlays() {
  const ctx = useContext(OverlayContext)
  if (!ctx) throw new Error('MapOverlayProvider missing')
  return ctx
}

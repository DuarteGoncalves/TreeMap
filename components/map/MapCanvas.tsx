'use client'

import { Box } from '@mui/material'
import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import { setMap } from './mapRef'

export default function MapCanvas() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const map = new maplibregl.Map({
      container: ref.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-9.14, 38.72],
      zoom: 10,
    })

    setMap(map)

    return () => map.remove()
  }, [])

  return (
    <Box
      ref={ref}
      id="map"
      sx={{
        position: 'absolute',
        inset: 0,
      }}
    />
  )
}

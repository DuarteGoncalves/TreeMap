'use client'

import { Box } from '@mui/material'
import { useMapOverlays } from './MapOverlayProvider'

export default function MapOverlayContainer() {
  const { overlays } = useMapOverlays()

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {overlays.map((o) => (
        <Box key={o.id} sx={{ pointerEvents: 'auto' }}>
          {o.element}
        </Box>
      ))}
    </Box>
  )
}

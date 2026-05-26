'use client'

import { Box } from '@mui/material'

export default function MapCrosshair() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        width: 24,
        height: 24,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 2,
          bgcolor: 'white',
          transform: 'translateX(-50%)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 2,
          bgcolor: 'white',
          transform: 'translateY(-50%)',
        }}
      />
    </Box>
  )
}

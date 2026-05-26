'use client'

import { Box } from '@mui/material'
import { ReactNode } from 'react'

export default function MapLayout({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        touchAction: 'none',
      }}
    >
      {children}
    </Box>
  )
}

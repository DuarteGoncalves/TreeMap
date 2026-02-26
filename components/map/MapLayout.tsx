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
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  )
}

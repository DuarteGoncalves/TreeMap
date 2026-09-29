'use client'

import { Box, Paper, Stack, Typography } from '@mui/material'
import { useCurrentLocation } from '@/lib/locationStore'

export default function LocationAccuracyIndicator() {
  const location = useCurrentLocation()

  if (!location || location.accuracy == null) return null

  const accuracy = location.accuracy

  let color = '#2e7d32'
  if (accuracy > 5) color = '#ed6c02'
  if (accuracy > 10) color = '#d32f2f'

  return (
    <Paper elevation={3} sx={{ p: 1 }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: color,
          }}
        />
        <Typography variant="body2">
          Accuracy: {accuracy.toFixed(1)} m
        </Typography>
      </Stack>
    </Paper>
  )
}

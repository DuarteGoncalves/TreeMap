'use client'

import { Box, Paper, Button, Stack } from '@mui/material'
import { getMap } from '../mapRef'
import type { StyleSpecification } from 'maplibre-gl'
import LocationAccuracyIndicator from '@/components/location/LocationAccuracyIndicator'
import { useEffect } from 'react'

type MapStyleOption = {
  label: string
  style: string | StyleSpecification
}

const styles: MapStyleOption[] = [
  {
    label: 'Sat',
    style: {
      version: 8,
      sources: {
        esri: {
          type: 'raster',
          tiles: [
            'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          attribution: 'Tiles © Esri',
        },
      },
      layers: [
        {
          id: 'esri-layer',
          type: 'raster',
          source: 'esri',
        },
      ],
    },
  },
  {
    label: 'Topo',
    style:
      'https://api.maptiler.com/maps/topo/style.json?key=XEE0rs6SPjOtSqGUg6ab',
  },
]

export default function StyleSwitcher() {
  const changeStyle = (style: string | StyleSpecification) => {
    const map = getMap()
    if (!map) return

    map.setStyle(style)
  }

  useEffect(() => {
    changeStyle(styles[1].style)
  }, [])

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        pointerEvents: 'auto',
      }}
    >
      <Stack spacing={1} direction="row">
        <LocationAccuracyIndicator />
        {styles.map((s) => (
          <Button
            key={s.label}
            variant="contained"
            size="small"
            onClick={() => changeStyle(s.style)}
          >
            {s.label}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}

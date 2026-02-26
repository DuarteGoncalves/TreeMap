'use client'

import { Box, Paper, Button, Stack } from '@mui/material'
import { getMap } from './mapRef'

const styles = [
  {
    label: 'Default',
    url: 'https://demotiles.maplibre.org/style.json',
  },
  {
    label: 'Bright',
    url: 'https://tiles.openfreemap.org/styles/bright',
  },
  {
    label: 'Positron',
    url: 'https://tiles.openfreemap.org/styles/positron',
  },
]

export default function StyleSwitcher() {
  const changeStyle = (url: string) => {
    const map = getMap()
    if (!map) return

    map.setStyle(url)
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        pointerEvents: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ p: 1 }}>
        <Stack spacing={1}>
          {styles.map((s) => (
            <Button
              key={s.url}
              variant="contained"
              size="small"
              onClick={() => changeStyle(s.url)}
            >
              {s.label}
            </Button>
          ))}
        </Stack>
      </Paper>
    </Box>
  )
}

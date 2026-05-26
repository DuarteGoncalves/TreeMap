'use client'

import { useState } from 'react'
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from '@mui/material'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import { useCurrentLocation } from './locationStore'
import { addTree } from '../tree/treeStore'

export default function AddLocationButton() {
  const location = useCurrentLocation()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!location) {
      alert('Sem localização disponível')
      return
    }

    setOpen(true)
  }

  const handleSelectSpecies = async (species: 'olive' | 'pine') => {
    if (!location) return

    try {
      setLoading(true)

      const res = await fetch('/api/trees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: location.latitude,
          lng: location.longitude,
          accuracy: location.accuracy ?? null,
          species,
        }),
      })

      const createdTree = await res.json()

      addTree(createdTree)

      if (!res.ok) throw new Error()
    } catch (err) {
      console.error(err)
      alert('Erro ao guardar árvore')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Fab
        color="secondary"
        onClick={handleClick}
        disabled={!location || loading}
        sx={{
          position: 'absolute',
          bottom: ({ spacing }) => spacing(10),
          right: ({ spacing }) => spacing(2),
          pointerEvents: 'auto',
        }}
      >
        <AddLocationIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Adicionar árvore</DialogTitle>

        <DialogContent>
          {location && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              precisão: {Math.round(location.accuracy ?? 0)} m
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => handleSelectSpecies('olive')}
            disabled={loading}
          >
            Olive
          </Button>

          <Button
            onClick={() => handleSelectSpecies('pine')}
            disabled={loading}
          >
            Pine
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

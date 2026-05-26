'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Stack,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { Tree } from '@/types'
import Camera from '../camera/Camera'

export default function TreeDialog({
  open,
  tree,
  onClose,
  onSave,
  onDelete,
  onMove,
}: {
  open: boolean
  tree: Tree | null
  onClose: () => void
  onSave: (updates: Partial<Tree>) => void
  onDelete: () => void
  onMove: () => void
}) {
  const [species, setSpecies] = useState<Tree['species']>('olive')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!tree) return

    setSpecies(tree.species)
    setNotes(tree.notes ?? '')
  }, [tree])

  if (!tree) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        Edit Tree
        <Camera treeId={tree.id} />
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            select
            label="Species"
            value={species}
            onChange={(e) =>
              setSpecies(e.target.value as Tree['species'])
            }
          >
            <MenuItem value="olive">Olive</MenuItem>
            <MenuItem value="pine">Pine</MenuItem>
          </TextField>

          <TextField
            label="Notes"
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={onDelete}>
          Delete
        </Button>

        <Button onClick={onMove}>Move</Button>

        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={() =>
            onSave({
              species,
              notes,
            })
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

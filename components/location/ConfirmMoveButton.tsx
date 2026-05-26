'use client'

import { Fab } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { getMap } from '../map/mapRef'

export default function ConfirmMoveButton({
  onConfirm,
  onCancel,
}: {
  onConfirm: (lat: number, lng: number) => void
  onCancel: () => void
}) {
  const confirm = () => {
    const map = getMap()
    if (!map) return

    const center = map.getCenter()

    onConfirm(center.lat, center.lng)
  }

  return (
    <>
      <Fab
        color="success"
        onClick={confirm}
        sx={{
          position: 'absolute',
          bottom: ({ spacing }) => spacing(26),
          right: ({ spacing }) => spacing(2),
        }}
      >
        <CheckIcon />
      </Fab>
      <Fab
        color="error"
        onClick={onCancel}
        sx={{
          position: 'absolute',
          bottom: ({ spacing }) => spacing(18),
          right: ({ spacing }) => spacing(2),
        }}
      >
        <CloseIcon />
      </Fab>
    </>
  )
}

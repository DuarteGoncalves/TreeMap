'use client'

import { useEffect, useRef, useState } from 'react'
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

export default function Camera({ treeId }: { treeId: string }) {
  const [open, setOpen] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [captured, setCaptured] = useState<Blob | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 🎥 start camera
  useEffect(() => {
    if (!open) return

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(setStream)

    return () => {
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [open])

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  // 📸 capture frame
  const capture = async () => {
    const video = videoRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx.drawImage(video, 0, 0)

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', 0.9)
    )

    if (blob) setCaptured(blob)
  }

  // 💾 upload
  const save = async () => {
    if (!captured) return

    const formData = new FormData()
    formData.append('file', captured, 'tree.jpg')

    await fetch(`/api/trees/pictures`, {
      method: 'POST',
      body: formData,
    })

    setCaptured(null)
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <CameraAltIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          {!captured ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: 8 }}
            />
          ) : (
            <img
              src={URL.createObjectURL(captured)}
              style={{ width: '100%', borderRadius: 8 }}
            />
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </DialogContent>

        <DialogActions>
          {!captured ? (
            <Button onClick={capture} variant="contained">
              Capturar
            </Button>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button onClick={() => setCaptured(null)}>
                Descartar
              </Button>
              <Button onClick={save} variant="contained">
                Guardar
              </Button>
            </Stack>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

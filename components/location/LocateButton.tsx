'use client'

import { Box, IconButton } from '@mui/material'
import MyLocationIcon from '@mui/icons-material/MyLocation'

import LocationDisabledTwoToneIcon from '@mui/icons-material/LocationDisabledTwoTone'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import StopIcon from '@mui/icons-material/Stop'
import { setCurrentLocation } from '../../lib/locationStore'
import { useRef, useState } from 'react'
import { getMap } from '../map/mapRef'
import { FloatingIconContainer } from '../menu/BottomRightMenu'

let recordedCoords: GeolocationCoordinates[] = []

const weightedAverage = (
  samples: GeolocationCoordinates[]
): GeolocationCoordinates | null => {
  if (samples.length === 0) return null

  let lat = 0
  let lng = 0
  let totalWeight = 0
  let accuracySum = 0

  for (const sample of samples) {
    const accuracy = Math.max(sample.accuracy, 1)
    const weight = 1 / accuracy

    lat += sample.latitude * weight
    lng += sample.longitude * weight
    totalWeight += weight

    accuracySum += sample.accuracy
  }

  const avgLat = lat / totalWeight
  const avgLng = lng / totalWeight
  const avgAccuracy = accuracySum / samples.length

  const base = samples[0]

  return {
    ...base,
    latitude: avgLat,
    longitude: avgLng,
    accuracy: avgAccuracy,
  }
}

interface LocateButtonProps {
  setPinLocation: React.Dispatch<
    React.SetStateAction<GeolocationCoordinates | null>
  >
}

export default function LocateButton({
  setPinLocation,
}: LocateButtonProps) {
  const [tracking, setTracking] = useState(false)
  const watchId = useRef<number | null>(null)
  const [recording, setRecording] = useState(false)

  const handleSetCurrentLocation: PositionCallback = ({ coords }) => {
    setCurrentLocation(coords)
    setPinLocation(coords)

    const { longitude, latitude } = coords

    getMap()?.flyTo({
      center: [longitude, latitude],
      zoom: 18,
    })
  }

  const handleSetAverageLocation: PositionCallback = ({ coords }) => {
    setPinLocation(coords)

    recordedCoords.push(coords)

    const newAverageCoords = weightedAverage(recordedCoords)

    console.log(recordedCoords)

    if (!newAverageCoords) return

    setCurrentLocation(newAverageCoords)

    const { longitude, latitude } = newAverageCoords

    getMap()?.flyTo({
      center: [longitude, latitude],
      zoom: 18,
    })
  }

  const toggleLocate = () => {
    setRecording(false)

    if (!navigator.geolocation) return

    if (tracking && watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current)
      watchId.current = null
      setTracking(false)
      setPinLocation(null)
      setCurrentLocation(null)
      return
    }

    setTracking(true)

    watchId.current = navigator.geolocation.watchPosition(
      handleSetCurrentLocation
    )
  }

  const toggleAverageLocation = () => {
    if (!navigator.geolocation) return

    setRecording(true)

    recordedCoords = []

    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current)
    }

    watchId.current = navigator.geolocation.watchPosition(
      handleSetAverageLocation
    )
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: tracking ? 48 : 0,
          opacity: tracking ? 1 : 0,
          pointerEvents: tracking ? 'auto' : 'none',
          transition: 'all 200ms ease',
        }}
      >
        <FloatingIconContainer>
          <IconButton
            size="small"
            onClick={recording ? toggleLocate : toggleAverageLocation}
            color={recording ? 'success' : 'error'}
          >
            {recording ? <StopIcon /> : <FiberManualRecordIcon />}
          </IconButton>
        </FloatingIconContainer>
      </Box>

      <FloatingIconContainer>
        <IconButton color="primary" onClick={toggleLocate}>
          {tracking ? (
            <LocationDisabledTwoToneIcon />
          ) : (
            <MyLocationIcon />
          )}
        </IconButton>
      </FloatingIconContainer>
    </Box>
  )
}

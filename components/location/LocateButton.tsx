'use client'

import { alpha, Box, Fab, keyframes } from '@mui/material'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone'
import LocationDisabledTwoToneIcon from '@mui/icons-material/LocationDisabledTwoTone'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import StopIcon from '@mui/icons-material/Stop'
import { setCurrentLocation } from './locationStore'
import { useRef, useState } from 'react'
import { getMap } from '../map/mapRef'
import { MapAnchor } from '../map/components/MapAnchor'

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1);
  }
  65% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(1);
  }
  80% {
    transform: scale(1);
  }
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`

let recordedCoords: GeolocationCoordinates[] = []

const weightedAverage = (
  samples: GeolocationCoordinates[]
): GeolocationCoordinates | null => {
  if (samples.length === 0) return null

  let lat = 0
  let lng = 0
  let totalWeight = 0
  let accuracySum = 0

  for (const s of samples) {
    const accuracy = Math.max(s.accuracy, 1)
    const weight = 1 / accuracy

    lat += s.latitude * weight
    lng += s.longitude * weight
    totalWeight += weight

    accuracySum += s.accuracy
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

export default function LocateButton() {
  const watchId = useRef<number | null>(null)
  const [tracking, setTracking] = useState(false)
  const [recording, setRecording] = useState(false)
  const [pinLocation, setPinLocation] =
    useState<GeolocationCoordinates>()

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
    <>
      {tracking && (
        <Fab
          size="small"
          onClick={recording ? toggleLocate : toggleAverageLocation}
          sx={{
            position: 'absolute',
            bottom: ({ spacing }) => spacing(2),
            right: ({ spacing }) => spacing(10),
            pointerEvents: 'auto',
          }}
          color={recording ? 'success' : 'error'}
        >
          {recording ? <StopIcon /> : <FiberManualRecordIcon />}
        </Fab>
      )}
      <Fab
        color="primary"
        onClick={toggleLocate}
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          pointerEvents: 'auto',
        }}
      >
        {tracking ? (
          <LocationDisabledTwoToneIcon />
        ) : (
          <MyLocationIcon />
        )}
      </Fab>
      {pinLocation && (
        <MapAnchor
          lng={pinLocation.longitude}
          lat={pinLocation.latitude}
        >
          <Box
            sx={{
              width: ({ spacing }) => spacing(4),
              height: ({ spacing }) => spacing(4),
              borderRadius: '50%',
              bgcolor: (theme) =>
                alpha(theme.palette.primary.dark, 0.6),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MyLocationTwoToneIcon
              color="disabled"
              sx={{
                color: 'white',
                animation: tracking
                  ? `${pulse} 1s infinite`
                  : undefined,
              }}
            />
          </Box>
        </MapAnchor>
      )}
    </>
  )
}

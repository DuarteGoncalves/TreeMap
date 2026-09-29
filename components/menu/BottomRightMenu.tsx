'use client'

import { Stack, Paper } from '@mui/material'
import { useState, type ReactElement } from 'react'
import AddLocationButton from '../location/AddLocationButton'
import LocateButton from '../location/LocateButton'
import { LocationMarker } from '../location/LocationMarker'

import SelectionModeButton from '../map/SelectionModeButton'
import { useMapSelection } from '../map/hooks/useMapSelection'
import MapSelection from '../map/MapSelection'

type FloatingIconContainerProps = {
  children: ReactElement | ReactElement[]
}

export const FloatingIconContainer = ({
  children,
}: FloatingIconContainerProps) => (
  <Paper
    elevation={4}
    sx={{
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'inline-flex',
    }}
  >
    {children}
  </Paper>
)

export default function BottomRightMenu() {
  const [pinLocation, setPinLocation] =
    useState<GeolocationCoordinates | null>(null)

  const mapSelection = useMapSelection()

  return (
    <>
      <MapSelection {...mapSelection} />
      <LocationMarker pinLocation={pinLocation} tracking />
      <Stack
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: ({ spacing }) => spacing(2),
          right: ({ spacing }) => spacing(2),
          pointerEvents: 'auto',
        }}
      >
        {!pinLocation && <SelectionModeButton {...mapSelection} />}
        <AddLocationButton />
        <div onClick={mapSelection.clear}>
          <LocateButton setPinLocation={setPinLocation} />
        </div>
      </Stack>
    </>
  )
}

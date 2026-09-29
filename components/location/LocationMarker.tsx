import { alpha, Box, keyframes } from '@mui/material'
import { MapAnchor } from '../map/components/MapAnchor'
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone'

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

type LocationMarkerProps = {
  pinLocation: GeolocationCoordinates | null
  tracking: boolean
}

export function LocationMarker({
  pinLocation,
  tracking,
}: LocationMarkerProps) {
  if (!pinLocation) return null

  return (
    <MapAnchor lng={pinLocation.longitude} lat={pinLocation.latitude}>
      <Box
        sx={{
          width: ({ spacing }) => spacing(4),
          height: ({ spacing }) => spacing(4),
          borderRadius: '50%',
          bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.6),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MyLocationTwoToneIcon
          sx={{
            color: 'white',
            animation: tracking ? `${pulse} 1s infinite` : undefined,
          }}
        />
      </Box>
    </MapAnchor>
  )
}

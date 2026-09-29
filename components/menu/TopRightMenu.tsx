import { Stack } from '@mui/material'
import LocationAccuracyIndicator from '../location/LocationAccuracyIndicator'
import MapStyleSwitcher from '../map/components/MapStyleSwitcher'
import UserAvatar from '../user/UserAvatar'

export default function TopRightMenu() {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        pointerEvents: 'auto',
        alignItems: 'flex-end',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          paddingBottom: 1,
        }}
      >
        <LocationAccuracyIndicator />
        <MapStyleSwitcher />
      </Stack>
      <UserAvatar
        sx={{
          width: 56,
          height: 56,
        }}
      />
    </Stack>
  )
}

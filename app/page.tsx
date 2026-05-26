import AddLocationButton from '@/components/location/AddLocationButton'
import LocateButton from '@/components/location/LocateButton'
import MapCanvas from '@/components/map/MapCanvas'
import MapLayout from '@/components/map/MapLayout'
import MapOverlayContainer from '@/components/map/MapOverlayContainer'
import StyleSwitcher from '@/components/map/components/StyleSwitcher'
import { TreesLayer } from '@/components/tree/TreesLayer'
import { auth0 } from '@/lib/auth0'

export default async function Page() {
  const session = await auth0.getSession()

  if (!session) {
    return (
      <>
        {/* Redirects to Auth0 to sign up */}
        <a href="/auth/login?screen_hint=signup">Signup</a>
        <br />
        {/* Redirects to Auth0 to log in */}
        <a href="/auth/login">Login</a>
      </>
    )
  }

  return (
    <MapLayout>
      <MapCanvas />
      <MapOverlayContainer />
      <AddLocationButton />
      <LocateButton />
      <TreesLayer />
      <StyleSwitcher />
    </MapLayout>
  )
}

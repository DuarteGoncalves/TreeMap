import MapCanvas from '@/components/map/MapCanvas'
import MapLayout from '@/components/map/MapLayout'
import MapOverlayContainer from '@/components/map/MapOverlayContainer'
import BottomRightMenu from '@/components/menu/BottomRightMenu'
import TopRightMenu from '@/components/menu/TopRightMenu'
import { TreesLayer } from '@/components/tree/TreesLayer'

export default async function Page() {
  return (
    <MapLayout>
      <MapCanvas />
      <MapOverlayContainer />
      <TreesLayer />
      <BottomRightMenu />
      <TopRightMenu />
    </MapLayout>
  )
}

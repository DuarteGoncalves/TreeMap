import MapCanvas from '@/components/map/MapCanvas'
import MapLayout from '@/components/map/MapLayout'
import StyleSwitcher from '@/components/map/StyleSwitcher'

export default async function Page() {
  return (
    <MapLayout>
      <MapCanvas />
      <StyleSwitcher />
    </MapLayout>
  )
}

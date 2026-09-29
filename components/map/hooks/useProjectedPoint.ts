import { useEffect, useState } from 'react'
import { getMap } from '../mapRef'

export function useProjectedPoint({
  lat,
  lng,
}: {
  lat: number
  lng: number
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const map = getMap()
    if (!map) return

    const update = () => {
      const p = map.project([lng, lat])
      setPos({ x: p.x, y: p.y })
    }

    update()

    map.on('render', update)

    return () => {
      map.off('render', update)
    }
  }, [lng, lat])

  return pos
}

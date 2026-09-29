import { useEffect, useRef, useState } from 'react'
import { getMap } from '../mapRef'
import { Point, Tree } from '@/types'
import { Map } from 'maplibre-gl'
import {
  addToSelection,
  clearSelection,
  useTrees,
} from '@/lib/treeStore'

const isTreeInsideBounds = (
  { lat, lng }: Tree,
  bounds: {
    north: number
    south: number
    east: number
    west: number
  }
): boolean =>
  lat <= bounds.north &&
  lat >= bounds.south &&
  lng <= bounds.east &&
  lng >= bounds.west

export const useMapSelection = () => {
  const trees = useTrees()?.trees ?? []
  const [enabled, setEnabled] = useState(false)

  const [dragStart, setDragStart] = useState<Point | null>(null)
  const [dragCurrent, setDragCurrent] = useState<Point | null>(null)

  const dragStartRef = useRef<Point | null>(null)
  const dragCurrentRef = useRef<Point | null>(null)
  const draggingRef = useRef(false)

  const updateDragStart = (point: Point | null) => {
    setDragStart(point)
    dragStartRef.current = point
  }

  const updateDragCurrent = (point: Point | null) => {
    setDragCurrent(point)
    dragCurrentRef.current = point
  }

  useEffect(() => {
    const map = getMap()

    if (!map) return

    if (enabled) {
      map.dragPan.disable()
      map.scrollZoom.disable()
      map.boxZoom.disable()
      map.doubleClickZoom.disable()
      map.touchZoomRotate.disable()

      map.getCanvas().style.cursor = 'crosshair'
    } else {
      map.dragPan.enable()
      map.scrollZoom.enable()
      map.boxZoom.enable()
      map.doubleClickZoom.enable()
      map.touchZoomRotate.enable()

      map.getCanvas().style.cursor = 'grab'

      updateDragStart(null)
      updateDragCurrent(null)

      draggingRef.current = false
    }
  }, [enabled])

  const onMouseDown = (e: MouseEvent) => {
    draggingRef.current = true

    updateDragStart({
      x: e.clientX,
      y: e.clientY,
    })

    updateDragCurrent({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return

    updateDragCurrent({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const onMouseUp = (map: Map) => () => {
    if (!draggingRef.current) return

    draggingRef.current = false

    const dragStart = dragStartRef.current
    const dragCurrent = dragCurrentRef.current

    if (!dragStart || !dragCurrent) return

    const startGeo = map.unproject([dragStart.x, dragStart.y])

    const endGeo = map.unproject([dragCurrent.x, dragCurrent.y])

    const bounds = {
      north: Math.max(startGeo.lat, endGeo.lat),
      south: Math.min(startGeo.lat, endGeo.lat),
      east: Math.max(startGeo.lng, endGeo.lng),
      west: Math.min(startGeo.lng, endGeo.lng),
    }

    addToSelection(
      trees.filter((tree) => isTreeInsideBounds(tree, bounds))
    )

    setTimeout(() => {
      updateDragStart(null)
      updateDragCurrent(null)
    }, 50)
  }

  useEffect(() => {
    if (!enabled) return

    const map = getMap()

    if (!map) return

    const canvas = map.getCanvas()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEnabled(false)
      }
    }

    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp(map))
    window.addEventListener('keydown', onKeyDown)

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp(map))
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [enabled])

  const clear = () => {
    updateDragStart(null)
    updateDragCurrent(null)
    clearSelection()
    setEnabled(false)
  }

  return {
    enabled,
    setEnabled,
    dragStart,
    dragCurrent,
    clear,
  }
}

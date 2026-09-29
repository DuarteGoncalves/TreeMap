import maplibregl from 'maplibre-gl'

let map: maplibregl.Map | null = null

export const setMap = (instance: maplibregl.Map) => {
  map = instance
}

export const getMap = () => map

export const enableSelectionMode = () => {
  if (!map) return

  map.dragPan.disable()
  map.scrollZoom.disable()
  map.boxZoom.disable()
  map.doubleClickZoom.disable()
  map.touchZoomRotate.disable()

  map.getCanvas().style.cursor = 'crosshair'
}

export const disableSelectionMode = () => {
  if (!map) return

  map.dragPan.enable()
  map.scrollZoom.enable()
  map.boxZoom.enable()
  map.doubleClickZoom.enable()
  map.touchZoomRotate.enable()

  map.getCanvas().style.cursor = 'grab'
}

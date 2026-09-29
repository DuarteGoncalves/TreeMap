import { useSyncExternalStore } from 'react'

let currentLocation: GeolocationCoordinates | null = null
const listeners = new Set<() => void>()

export function setCurrentLocation(
  coords: GeolocationCoordinates | null
) {
  currentLocation = coords
  listeners.forEach((l) => l())
}

export function getCurrentLocation() {
  return currentLocation
}

export function useCurrentLocation() {
  return useSyncExternalStore(
    (callback) => {
      listeners.add(callback)
      return () => listeners.delete(callback)
    },
    () => currentLocation,
    () => null
  )
}

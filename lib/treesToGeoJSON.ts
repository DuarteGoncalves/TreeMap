import { Tree } from '@/types'

export function treesToGeoJSON(trees: Tree[]) {
  return {
    type: 'FeatureCollection',
    features: trees.map((tree) => ({
      type: 'Feature',
      properties: {
        id: tree.id,
        species: tree.species,
      },
      geometry: {
        type: 'Point',
        coordinates: [tree.lng, tree.lat],
      },
    })),
  }
}

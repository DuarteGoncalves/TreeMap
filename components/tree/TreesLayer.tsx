'use client'

import { useEffect } from 'react'
import TreeMarker from './TreeMarker'
import { useTrees, setTrees } from '@/lib/treeStore'

export function TreesLayer() {
  const treesState = useTrees()

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/trees')
      const data = await res.json()

      setTrees(data)
    }

    load()
  }, [])

  const { trees, selection } = treesState ?? {
    trees: [],
    selection: [],
  }

  return (
    <>
      {trees.map((tree) => (
        <TreeMarker
          key={tree.id}
          tree={tree}
          isSelected={selection.includes(tree.id)}
        />
      ))}
    </>
  )
}

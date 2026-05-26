'use client'

import { useEffect } from 'react'
import TreeMarker from './TreeMarker'
import { useTrees, setTrees } from '@/components/tree/treeStore'

export function TreesLayer() {
  const trees = useTrees()

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/trees')
      const data = await res.json()

      setTrees(data)
    }

    load()
  }, [])

  return (
    <>
      {trees?.map((tree) => (
        <TreeMarker key={tree.id} tree={tree} />
      ))}
    </>
  )
}

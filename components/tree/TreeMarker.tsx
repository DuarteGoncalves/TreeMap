'use client'

import { useState } from 'react'
import TreeDialog from './TreeDialog'
import { Tree } from '@/types'
import { MapAnchor } from '../map/components/MapAnchor'
import { removeTree, updateTree } from './treeStore'
import MapCrosshair from '../location/MapCrosshair'
import ConfirmMoveButton from '../location/ConfirmMoveButton'

export default function TreeMarker({ tree }: { tree: Tree }) {
  const [open, setOpen] = useState(false)
  const [moveMode, setMoveMode] = useState(false)

  async function handleUpdateTree(updates: Partial<Tree>) {
    const res = await fetch(`/api/trees/${tree.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    const updatedTree: Tree = await res.json()

    updateTree(updatedTree)

    setOpen(false)
  }

  async function handleDeleteTree() {
    await fetch(`/api/trees/${tree.id}`, {
      method: 'DELETE',
    })

    removeTree(tree.id)

    setOpen(false)
  }

  async function handleMoveTree(lat: number, lng: number) {
    const res = await fetch(`/api/trees/${tree.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat, lng }),
    })

    const updated = await res.json()
    updateTree(updated)
    setMoveMode(false)
  }

  return (
    <>
      <MapAnchor lng={tree.lng} lat={tree.lat}>
        <div
          onClick={() => setOpen(true)}
          style={{
            cursor: 'pointer',
            fontSize: 24,
            userSelect: 'none',
          }}
        >
          {tree.species === 'olive' ? '🫒' : '🌲'}
        </div>
      </MapAnchor>

      <TreeDialog
        open={open}
        tree={tree}
        onClose={() => setOpen(false)}
        onSave={handleUpdateTree}
        onDelete={handleDeleteTree}
        onMove={() => {
          setMoveMode(true)
          setOpen(false)
        }}
      />

      {moveMode && (
        <>
          <MapCrosshair />
          <ConfirmMoveButton
            onConfirm={handleMoveTree}
            onCancel={() => {
              setMoveMode(false)
            }}
          />
        </>
      )}
    </>
  )
}

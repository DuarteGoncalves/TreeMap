'use client'

import { useState } from 'react'
import TreeDialog from './TreeDialog'
import { Tree } from '@/types'
import { MapAnchor } from '../map/components/MapAnchor'
import { removeTree, updateTree } from '../../lib/treeStore'
import MapCrosshair from '../location/MapCrosshair'
import ConfirmMoveButton from '../location/ConfirmMoveButton'

const getSelectedStyle = (isSelected: boolean) =>
  isSelected
    ? {
        outline: '2px dashed orange',
        outlineOffset: '2px',
        borderRadius: '50%',
      }
    : {}

export default function TreeMarker({
  tree,
  isSelected,
}: {
  tree: Tree
  isSelected: boolean
}) {
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
            transition:
              'box-shadow 0.2s, outline 0.2s, background 0.2s',
            ...getSelectedStyle(isSelected),
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

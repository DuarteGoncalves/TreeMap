'use client'

import { Tree } from '@/types'
import { useSyncExternalStore } from 'react'

type TreesStates = {
  trees: Tree[]
  selection: string[]
}

let treesState: TreesStates = {
  trees: [],
  selection: [],
}

const listeners = new Set<() => void>()

const emit = () => {
  listeners.forEach((l) => l())
}

export const setTrees = (newTrees: Tree[]) => {
  treesState = { ...treesState, trees: newTrees }
  emit()
}

export const addTree = (newTree: Tree) => {
  const { trees } = treesState

  treesState = { ...treesState, trees: [...trees, newTree] }
  emit()
}

export const updateTree = (updated: Tree) => {
  const { trees } = treesState

  treesState = {
    ...treesState,
    trees: trees.map((t) => (t.id === updated.id ? updated : t)),
  }
  emit()
}

export const removeTree = (id: string) => {
  const { trees } = treesState

  treesState = {
    ...treesState,
    trees: trees.filter((t) => t.id !== id),
  }
  emit()
}

export const addToSelection = (trees: Tree[]) => {
  const newSelection = new Set(treesState.selection)
  trees.forEach((tree) => newSelection.add(tree.id))

  treesState = {
    ...treesState,
    selection: [...newSelection],
  }
  emit()
}

export const clearSelection = () => {
  treesState = {
    ...treesState,
    selection: [],
  }
  emit()
}

export const useTrees = () => {
  return useSyncExternalStore(
    (callback) => {
      listeners.add(callback)
      return () => listeners.delete(callback)
    },
    () => treesState,
    () => null
  )
}

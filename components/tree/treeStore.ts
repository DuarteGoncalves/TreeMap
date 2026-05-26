'use client'

import { Tree } from '@/types'
import { useSyncExternalStore } from 'react'

let trees: Tree[] = []

const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

export function setTrees(newTrees: Tree[]) {
  trees = newTrees
  emit()
}

export function addTree(tree: Tree) {
  trees = [...trees, tree]
  emit()
}

export function updateTree(updated: Tree) {
  trees = trees.map((t) => (t.id === updated.id ? updated : t))
  emit()
}

export function removeTree(id: string) {
  trees = trees.filter((t) => t.id !== id)
  emit()
}

export function useTrees() {
  return useSyncExternalStore(
    (callback) => {
      listeners.add(callback)
      return () => listeners.delete(callback)
    },
    () => trees,
    () => null
  )
}

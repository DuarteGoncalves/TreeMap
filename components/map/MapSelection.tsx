import { Point } from '@/types'

export default function MapSelection({
  dragStart,
  dragCurrent,
}: {
  dragStart: Point | null
  dragCurrent: Point | null
}) {
  if (!dragStart || !dragCurrent) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: Math.min(dragStart.x, dragCurrent.x),
        top: Math.min(dragStart.y, dragCurrent.y),
        width: Math.abs(dragCurrent.x - dragStart.x),
        height: Math.abs(dragCurrent.y - dragStart.y),
        background: 'rgba(255, 165, 0, 0.2)',
        border: '2px dashed orange',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}

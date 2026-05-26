'use client'

import { useProjectedPoint } from '../hooks/useProjectedPoint'

type Anchor =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

function getAnchorTransform(anchor: Anchor) {
  switch (anchor) {
    case 'center':
      return 'translate(-50%, -50%)'

    case 'top':
      return 'translate(-50%, 0%)'

    case 'bottom':
      return 'translate(-50%, -100%)'

    case 'left':
      return 'translate(0%, -50%)'

    case 'right':
      return 'translate(-100%, -50%)'

    case 'top-left':
      return 'translate(0%, 0%)'

    case 'top-right':
      return 'translate(-100%, 0%)'

    case 'bottom-left':
      return 'translate(0%, -100%)'

    case 'bottom-right':
      return 'translate(-100%, -100%)'
  }
}

export function MapAnchor({
  lng,
  lat,
  anchor = 'center',
  children,
}: {
  lng: number
  lat: number
  anchor?: Anchor
  children: React.ReactNode
}) {
  const { x, y } = useProjectedPoint({ lng, lat })

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
        pointerEvents: 'auto',
      }}
    >
      <div style={{ transform: getAnchorTransform(anchor) }}>
        {children}
      </div>
    </div>
  )
}

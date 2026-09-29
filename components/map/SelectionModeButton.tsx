'use client'

import SelectAllIcon from '@mui/icons-material/SelectAll'
import { IconButton } from '@mui/material'
import { FloatingIconContainer } from '../menu/BottomRightMenu'

interface SelectionModeButtonProps {
  enabled: boolean
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SelectionModeButton({
  enabled,
  setEnabled,
}: SelectionModeButtonProps) {
  return (
    <>
      <FloatingIconContainer>
        <IconButton
          onClick={() => {
            setEnabled((prev) => !prev)
          }}
          color={enabled ? 'primary' : 'default'}
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          <SelectAllIcon />
        </IconButton>
      </FloatingIconContainer>
    </>
  )
}

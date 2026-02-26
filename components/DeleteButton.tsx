'use client'

import { useTransition } from 'react'
import { LoadingButton } from '@mui/lab'
import DeleteIcon from '@mui/icons-material/Delete'

export default function DeleteButton({
    userId,
    onDelete,
}: {
    userId: string
    onDelete: (id: string) => void
}) {
    const [isPending, startTransition] = useTransition()

    const handleClick = () => startTransition(() => onDelete(userId))

    return (
        <LoadingButton
            loading={isPending}
            loadingPosition="start"
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClick}
        >
            Delete
        </LoadingButton>
    )
}

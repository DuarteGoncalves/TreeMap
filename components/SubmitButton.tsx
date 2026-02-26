'use client'

import { useFormStatus } from 'react-dom'
import { LoadingButton } from '@mui/lab'
import PersonAddIcon from '@mui/icons-material/PersonAdd'


export default function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <LoadingButton
            type="submit"
            loading={pending}
            loadingPosition="start"
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
        >
            Create
        </LoadingButton>
    )
}

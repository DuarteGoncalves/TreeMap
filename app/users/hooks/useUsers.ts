import { User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useActionState } from "react"

const API = '/api/users'

const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(API)
    return res.json()
}

export const useUsers = () => {
    const queryClient = useQueryClient()

    const {
        data: users = [],
        isLoading,
    } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

    const [createState, createUser, creatingUser] = useActionState(
        async (_prevState: any, formData: FormData) => {
            const name = formData.get('name')
            const email = formData.get('email')

            if (!name || !email) {
                return { error: 'Missing fields' }
            }

            await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            })

            queryClient.invalidateQueries({ queryKey: ['users'] })
            return { success: true }
        },
        null
    )

    const [deleteState, deleteUser, deletingUser] = useActionState(
        async (_prevState: any, id: string) => {
            await fetch(`${API}/${id}`, { method: 'DELETE' })
            queryClient.invalidateQueries({ queryKey: ['users'] })
            return { success: true }
        },
        null
    )

    const isMutating = creatingUser || deletingUser

    return {
        createUser,
        createState,
        deleteUser,
        deleteState,
        users,
        isLoading,
        isMutating,
        isBusy: isLoading || isMutating,
    }
}

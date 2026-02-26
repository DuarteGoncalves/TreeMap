'use client'

import DeleteButton from '@/components/DeleteButton'
import SubmitButton from '@/components/SubmitButton'
import { useUsers } from './hooks/useUsers'
import { User } from '@/types'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'

export default function UsersPage() {
  const { createUser, deleteUser, isBusy, users } = useUsers()

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isBusy ? 'Loading…' : 'Users'}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create user
          </Typography>

          <form action={createUser}>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Name"
                size="small"
                required
              />

              <TextField
                name="email"
                label="Email"
                type="email"
                size="small"
                required
              />

              <SubmitButton />
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <List>
            {users.map(({ id, name, email }: User, index) => (
              <div key={id}>
                <ListItem
                  secondaryAction={
                    <DeleteButton userId={id} onDelete={deleteUser} />
                  }
                >
                  <ListItemText primary={name} secondary={email} />
                </ListItem>

                {index < users.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  )
}

'use client'
import { Card, CardContent, Button, Stack, Box } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ minWidth: 300, p: 2, borderRadius: 6 }} elevation={5}>
        <CardContent>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained">About 1</Button>
            <Button variant="outlined">About 2</Button>
            <Button variant="contained" color="secondary">
              About 3
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}


export default About

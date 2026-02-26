"use client";

import Link from "next/link";
import { AppBar, Toolbar, Button, Box, Stack } from "@mui/material";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <AppBar>
      <Toolbar sx={{ bgcolor: "grey.100" }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link href="/" >
            <Button
              size="small"
              variant={pathname === "/" ? "outlined" : "contained"}
            >
              Home
            </Button>
          </Link>
          <Link href="/about" >
            <Button
              size="small"
              variant={pathname === "/about" ? "outlined" : "contained"}
            >
              About
            </Button>
          </Link>
          <Link href="/users" >
            <Button
              size="small"
              variant={pathname === "/users" ? "outlined" : "contained"}
            >
              Users
            </Button>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <AppBar position="sticky">
            <Toolbar sx={{justifyContent: "space-between"}}>
                <IconButton sx={{padding: 0}} color="inherit">
                    <MenuIcon fontSize="large"/>
                </IconButton>
                <Typography variant="h4">Mario</Typography>
                <AccountCircleIcon fontSize="large"/>
            </Toolbar>
        </AppBar>
        <main>
            {children}
        </main>
    </>
  )
}
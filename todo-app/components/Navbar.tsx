"use client"

import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import * as React from 'react'

export default class Navbar extends React.Component {
    render(): React.ReactNode {
        return (
            <AppBar position="static" color='primary'>
                <Toolbar variant="dense" sx={{ justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <Typography variant="h6" color="inherit" component="div" sx={{ letterSpacing: ".3rem"}}>
                        TodoApp
                    </Typography>
                    <Typography color="inherit" component="div" variant='caption'>
                        - billalxcode - 
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}
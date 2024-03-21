import React from 'react'
import { Outlet } from 'react-router-dom'
import Header2 from "../components/Header2"
import Sidebar2 from "../components/Sidebar2"
import { Box, Snackbar } from '@mui/material'
import ComposeEmail from "../components/ComposeMail"


export default function RouteLayout() {

    return (
        <>
            <Header2/>
            <Box sx={{ display: "flex" }}>
                <Sidebar2 />
                <Box sx={{ flexGrow: 1, p: 0 }}>

                    <Outlet/>
                </Box>
            </Box>
            <ComposeEmail/>
        </>
    )
}

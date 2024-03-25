import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ComposeEmail from "../components/ComposeMail"
import { grey, blue } from '@mui/material/colors'
import { Box, CssBaseline } from '@mui/material'
import Sidebar2 from "../components/Sidebar2"
import Header2 from "../components/Header2"
import useStore from '../components/store'
import { Outlet } from 'react-router-dom'
import React from 'react'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...blue,
      ...(mode === 'dark' && {
        main: grey[50],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: grey[600],
        paper: grey[800],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
          primary: grey[900],
          secondary: grey[400],
        }
        : {
          primary: grey[50],
          secondary: grey[50],
        }),
    },
  },
});



const queryClient = new QueryClient()

export default function RouteLayout() {
  const darkModeTheme = themestatus ? createTheme(getDesignTokens('dark')) : createTheme(getDesignTokens('light'));


  const { falsemark, themestatus, truemark } = useStore()

  return (
    <>
      {/* React Query provider */}
      <QueryClientProvider client={queryClient}>
        {/* MUI theme provider */}
        <ThemeProvider theme={darkModeTheme}>
          <CssBaseline />
          {/* Main app */}
          <Header2 />
          <Box sx={{ display: "flex" }}>
            <div onMouseOver={() => { truemark("SideMenuStatus") }} onMouseLeave={() => { falsemark("SideMenuStatus") }} >
              <Sidebar2 />
            </div>
            <Box onClick={() => { falsemark("SideMenuStatus") }} sx={{ flexGrow: 1, p: 0 }}>
              <Outlet />
            </Box>
          </Box>
          <ComposeEmail />

        </ThemeProvider>

      </QueryClientProvider>
    </>
  )
}

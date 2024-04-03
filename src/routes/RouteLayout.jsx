import { ThemeProvider, createTheme } from '@mui/material/styles';
import ComposeEmail from "../components/ComposeMail"
import { grey, blue } from '@mui/material/colors'
import { Box, CssBaseline } from '@mui/material'
import Sidebar from "../components/Sidebar"
import Header2 from "../components/Header2"
import useStore from '../components/store'
import { Outlet } from 'react-router-dom'
import React from 'react'
import Redirect from '../components/Redirect';
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




export default function RouteLayout() {
  const { falsemark, themestatus, User } = useStore()
  const darkModeTheme = themestatus ? createTheme(getDesignTokens('dark')) : createTheme(getDesignTokens('light'));



  return (
    <>
      {/* React Query provider */}
      {/* MUI theme provider */}
      <ThemeProvider theme={darkModeTheme}>
        <CssBaseline />
        {/* Main app */}

        <Header2 />

        <Sidebar />
        {User.name===""?
           <Redirect />:<Outlet />
        }

        <ComposeEmail />
      </ThemeProvider>

    </>
  )
}

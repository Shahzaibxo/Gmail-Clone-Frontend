import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {NextUIProvider} from "@nextui-org/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>

  <NextUIProvider>
    
    <App/>
    
  </NextUIProvider>
  </QueryClientProvider>

)

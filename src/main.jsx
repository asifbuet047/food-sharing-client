import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './Root.jsx'
import AuthenticationContextProvider from './Contexts/AuthenticationContextProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import routes from './Routes/Routes.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <RouterProvider router={routes}></RouterProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </AuthenticationContextProvider>
    <ToastContainer></ToastContainer>
  </React.StrictMode>,
)

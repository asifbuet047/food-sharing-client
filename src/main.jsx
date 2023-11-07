import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './Root.jsx'
import AuthenticationContextProvider from './Contexts/AuthenticationContextProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import routes from './Routes/Routes.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <RouterProvider router={routes}></RouterProvider>
    </AuthenticationContextProvider>
    <ToastContainer></ToastContainer>
  </React.StrictMode>,
)

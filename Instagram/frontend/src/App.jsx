import React from 'react'
import AppRoutes from './AppRoutes'
import './style.scss'
import { AuthProvider } from './feature/auth/Auth.context'

const App = () => {
  return (
    <AuthProvider>
    <AppRoutes/>
    </AuthProvider>
  )
}

export default App

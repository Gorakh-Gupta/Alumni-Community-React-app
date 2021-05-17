import React from 'react'
import Router from './Router'
import axios from 'axios'
import { AuthContextProvider } from './context/AuthContext'
axios.defaults.withCredentials=true; 
function App() {
  
  return (
    <div>
      <AuthContextProvider>
        <Router />
        </AuthContextProvider>
    </div>
  )
}
export default App





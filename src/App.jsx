import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './ui/layout'
import HomeCom from './components/home'
import Register from './components/signup'
import LoginPage from './components/login'
import TaskCom from './components/tasks'
import DashboardCom from './components/dashboard'
import NotFoundPage from './ui/notfoundpage'
import { AuthProvider } from './context/authContext'
import ProtectedRoute from './ui/protectedRoute'

function App() { 

  return (
    <>
    <AuthProvider>
    
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomeCom/>} />
          <Route path='/signup' element={<Register/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/tasks" element ={<ProtectedRoute><TaskCom/></ProtectedRoute>}/>
          <Route path="/dashboard" element={<ProtectedRoute><DashboardCom/></ProtectedRoute>}/>
          <Route path='/*' element={<NotFoundPage/>} />

        </Route>
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App

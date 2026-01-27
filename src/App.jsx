import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './assets/pages/HomePage'
import RegisterPage from './assets/pages/RegisterPage'
import LoginPage from './assets/pages/LoginPage'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      
    </Routes>
    </BrowserRouter>
  )
}

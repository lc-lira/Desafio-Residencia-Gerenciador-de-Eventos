import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import CadastrarAdmin from './pages/Login/cadastrarAdmin'
import LoginPage from './pages/Login/LoginPage'
import Home from './pages/Home/index'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CadastrarAdmin />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

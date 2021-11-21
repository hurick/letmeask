import { lazy, ReactElement, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthContextProvider from '../contexts/Auth'

const Login = lazy(() => import('../pages/Login'))
const Create = lazy(() => import('../pages/Rooms/Create'))
const Room = lazy(() => import('../pages/Rooms/Room'))
const Admin = lazy(() => import('../pages/Rooms/Admin'))

export const Router = (): ReactElement => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/rooms/create" element={<Create />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/rooms/:id/admin" element={<Admin />} />
        </Routes>
      </AuthContextProvider>
    </Suspense>
  </BrowserRouter>
)

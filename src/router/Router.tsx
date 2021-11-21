import { lazy, ReactElement, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthContextProvider from '../contexts/Auth'

const Login = lazy(() => import('../pages/Login'))
const Create = lazy(() => import('../pages/Rooms/Create'))
const Room = lazy(() => import('../pages/Rooms/Room'))

export const Router = (): ReactElement => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/rooms/create" element={<Create />} />
          <Route path="/rooms/:id" element={<Room />} />
        </Routes>
      </AuthContextProvider>
    </Suspense>
  </BrowserRouter>
)

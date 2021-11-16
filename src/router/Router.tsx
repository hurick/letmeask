import { lazy, ReactElement, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthContextProvider from '../contexts/Auth'

const Home = lazy(() => import('../pages/Home'))
const CreateRoom = lazy(() => import('../pages/CreateRoom'))

export const Router = (): ReactElement => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home/ >} />
          <Route path="/rooms/create" element={<CreateRoom/ >} />
        </Routes>
      </AuthContextProvider>
    </Suspense>
  </BrowserRouter>
)

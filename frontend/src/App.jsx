import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import MainLayout from './pages/Layouts/MainLayout'

export default function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}
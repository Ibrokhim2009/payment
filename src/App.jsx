import React from 'react'
import Payment from './pages/payment/Payment'
import { Route, Routes } from 'react-router-dom'
import Tables from './pages/table/Tables'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Payment />} />
      <Route path="tables" element={<Tables />} />
    </Routes>
  )
}

export default App

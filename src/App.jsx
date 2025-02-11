import React, { createContext, useState } from 'react'
import Payment from './pages/payment/Payment'
import { Route, Routes } from 'react-router-dom'
import Tables from './pages/table/Tables'
import { cardApi } from './constants/services'
export const Context = createContext()
function App() {
  const [cardArr, setCardArr] = useState([
    {
      id: "a7ad",
      cardNumber: "",
      cardHolder: "ыфв",
      expiryDate: "12/31",
      url: "http://localhost:300/cards/ыфв",
      data: "2025-02-10 14:09:25"
    },
    {
      id: "a8ea",
      cardNumber: "4111 1111 1111 1111",
      cardHolder: "21312",
      expiryDate: "12/31",
      url: "http://localhost:300/cards/21312",
      data: "2025-02-10 14:11:12"
    }
  ])
  const [phoneArr, setPhoneArr] = useState([
    {
      id: "f7d8",
      tel: "+9989112323423",
      name: "Исмоил",
      data: "2025-02-10 14:00:21"
    },
    {
      id: "f7d3",
      tel: "+9989112323423",
      name: "Исмоил",
      data: "2025-02-10 14:00:21"
    },
  ])
  return (
    <Context.Provider value={{ cardArr, setCardArr, phoneArr, setPhoneArr }}>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="tables" element={<Tables />} />
      </Routes>
    </Context.Provider>
  )
}

export default App

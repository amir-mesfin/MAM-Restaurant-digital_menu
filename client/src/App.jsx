import React  from 'react'
import Home from './page/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Carousels from './components/Carousels'

function App() {

  return (
    <BrowserRouter>
    <Header />
    <Carousels />
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
             
   {/* <Footer /> */}
   </BrowserRouter>
  )
}

export default App

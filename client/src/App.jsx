import React  from 'react'
import Home from './page/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Carousels from './components/Carousels'
import Catagory from './components/Catagory'

function App() {

  return (
    <BrowserRouter>
    <Header />
    <Carousels />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catagory/:catagoryName" element={ <Catagory />} />
      </Routes>
             
   {/* <Footer /> */}
   </BrowserRouter>
  )
}

export default App

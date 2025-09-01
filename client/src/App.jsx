import React from "react";
import Home from "./page/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Carousels from "./components/Carousels";
import Catagory from "./components/Catagory";
import Footer from "./components/Footer";
import Sign from "./page/Sign";

function Layout({ children }) {
  const location = useLocation();

  // Check if we are in the sign page
  const isSignPage = location.pathname === "/sign";

  return (
    <>
      <Header />
      {/* Show Carousel only if not on Sign page */}
      {!isSignPage && <Carousels />}

      {children}

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catagory/:catagoryName" element={<Catagory />} />
          <Route path="/sign" element={<Sign />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import Home from "./page/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Carousels from "./components/Carousels";
import Catagory from "./components/Catagory";
import Footer from "./components/Footer";
import Sign from "./page/Sign";
import Owner from "./page/Owner";
import ProtectedRouter from "./page/ProtectedRouter";

function Layout({ children }) {
  const location = useLocation();

  // Check if we are in the sign page
  const isSignPage = location.pathname === "/sign" || location.pathname === "/owner";

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
          <Route path="/category/:categoryId" element={<Catagory />} />
          <Route path="/sign" element={<Sign />} />
          
          <Route
            path="/owner"
            element={
              <ProtectedRouter>
                <Owner />
              </ProtectedRouter>
            }
          />
          
          {/* Add catch-all route for undefined paths */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
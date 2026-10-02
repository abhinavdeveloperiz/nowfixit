import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import ScrollToTop from "./assets/components/ScrollToTop";

import Home from "./assets/pages/Home";
import Products from "./assets/pages/Products";
import ProductDetails from "./assets/pages/ProductDetails";
import MyOrders from "./assets/pages/MyOrders";
import Profile from "./assets/pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Pages */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

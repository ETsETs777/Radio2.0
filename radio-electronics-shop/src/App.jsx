import React from "react";
import { Routes, Route } from "react-router-dom";

// Компоненты
import Header from "./components/Header";
import Footer from "./components/Footer";

// Страницы
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import TempAddProduct from "./pages/TempAddProduct";
import AuthForm from "./components/AuthForm";
import ProfilePage from "./pages/ProfilePage"; // ✅ Новая страница
import NotFound from "./pages/NotFound"; // ✅ Страница 404
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Защита маршрутов

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute roles={["admin"]}>
                <TempAddProduct />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./layouts/navbar";
import Footer from "./layouts/footer/footer"; // Importa el footer
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import Home from "./Pages/HomePage";
import DetailProduct from "./Pages/DatailProductPage";
import { CartProvider } from "./Contexts/cartContextType";
import { AuthProvider } from "./Contexts/AuthContext";
import { SearchProvider } from "./Contexts/searchContext";
import ProductsBySub from "./Pages/ProductsBySubPage";
import Resumen from "./Pages/ResumenPage";
import ResetPassword from "./layouts/Form/ChangePasForm";
import Profile from "./layouts/Form/updateAuthForm";
import OrdersList from "./layouts/orders";
import PageProductPromotion from "./Pages/ProductByPromotionPage";
import InvoicePage from "./Pages/InvoicePage";
import { ToastProvider } from "./Contexts/toastContext";
import { AboutUS } from "./Pages/AboutUsPage";
import { Contact } from "./Pages/ContactPage";
import PolíticasYTerminos from "./Pages/PoliticasYTerminosPage";
import ThemeToggle from "./Helpers/ThemeToggle";

const AppLayout: React.FC = () => {
  const location = useLocation();
  const hideNavbar = 
  location.pathname === "/login" || 
  location.pathname === "/signup" || 
  location.pathname === "/reset-password" || 
  location.pathname.startsWith("/profile/invoice/");
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:id" element={<DetailProduct />} />
        <Route path="/subCategories/:subCategoryId/Products" element={<ProductsBySub />} />
        <Route path="/resumen" element={<Resumen />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/orders" element={<OrdersList/>}/>
        <Route path="/promotions/:promotionId/products" element={<PageProductPromotion/>}/>
        <Route path="/profile/invoice/:invoice" element={<InvoicePage />} />
        <Route path="/aboutUs" element={<AboutUS/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/PolíticasYTerminos" element={<PolíticasYTerminos/>}/>
        

      </Routes>
      <div className="fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
      {!hideNavbar && <Footer />} 
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <SearchProvider>
      <AuthProvider>
      <CartProvider> 
          <AppLayout />
        </CartProvider>
      </AuthProvider>
      </SearchProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;

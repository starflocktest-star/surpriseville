import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import FaqsPage from './pages/FaqsPage';
import BlogPage from './pages/BlogPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CancellationPolicyPage from './pages/CancellationPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { OrderProvider } from './contexts/OrderContext';
import { AuthProvider } from './contexts/AuthContext';
import { UserAuthProvider } from './contexts/UserAuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProtectedRoute from './components/UserProtectedRoute';
import { WishlistProvider } from './contexts/WishlistContext';
import WishlistPage from './pages/WishlistPage';
import UserOrdersPage from './pages/UserOrdersPage';

// Vendor imports
import VendorLoginPage from './pages/vendor/VendorLoginPage';
import VendorSignupPage from './pages/vendor/VendorSignupPage';
import VendorLayout from './pages/vendor/VendorLayout';
import VendorProtectedRoute from './components/VendorProtectedRoute';
import VendorProfilePage from './pages/vendor/VendorProfilePage';
import VendorServicesPage from './pages/vendor/VendorServicesPage';
import VendorOrdersPage from './pages/vendor/VendorOrdersPage';
import VendorWalletPage from './pages/vendor/VendorWalletPage';
import { VendorProvider } from './contexts/VendorContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { WalletProvider } from './contexts/WalletContext';


const MainLayout = () => (
  <div className="bg-gray-50 text-gray-800 font-sans">
    <Header />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <ProductProvider>
          <VendorProvider>
            <PortfolioProvider>
              <WalletProvider>
                <OrderProvider>
                  <WishlistProvider>
                    <CartProvider>
                      <HashRouter>
                        <Routes>
                          {/* Main Site Routes */}
                          <Route element={<MainLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/faqs" element={<FaqsPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/privacy" element={<PrivacyPolicyPage />} />
                            <Route path="/terms" element={<TermsPage />} />
                            <Route path="/cancellation" element={<CancellationPolicyPage />} />
                            <Route path="/shipping" element={<ShippingPolicyPage />} />
                            
                            {/* User Auth Routes */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />

                            {/* User Protected Routes */}
                            <Route element={<UserProtectedRoute />}>
                                <Route path="/wishlist" element={<WishlistPage />} />
                                <Route path="/account/orders" element={<UserOrdersPage />} />
                            </Route>
                          </Route>

                          {/* Admin Routes */}
                          <Route path="/admin/login" element={<AdminLoginPage />} />
                          <Route element={<ProtectedRoute />}>
                            <Route path="/admin" element={<AdminLayout />}>
                              <Route index element={<AdminDashboardPage />} />
                              <Route path="new" element={<AdminProductFormPage />} />
                              <Route path="edit/:id" element={<AdminProductFormPage />} />
                              <Route path="orders" element={<AdminOrdersPage />} />
                            </Route>
                          </Route>

                          {/* Vendor Routes */}
                          <Route path="/vendor/login" element={<VendorLoginPage />} />
                          <Route path="/vendor/signup" element={<VendorSignupPage />} />
                          <Route element={<VendorProtectedRoute />}>
                            <Route path="/vendor" element={<VendorLayout />}>
                               <Route path="profile" element={<VendorProfilePage />} />
                               <Route path="services" element={<VendorServicesPage />} />
                               <Route path="orders" element={<VendorOrdersPage />} />
                               <Route path="wallet" element={<VendorWalletPage />} />
                            </Route>
                          </Route>

                        </Routes>
                      </HashRouter>
                    </CartProvider>
                  </WishlistProvider>
                </OrderProvider>
              </WalletProvider>
            </PortfolioProvider>
          </VendorProvider>
        </ProductProvider>
      </UserAuthProvider>
    </AuthProvider>
  );
};

export default App;

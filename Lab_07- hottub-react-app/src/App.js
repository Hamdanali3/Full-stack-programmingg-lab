import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import {
  AboutPage,
  CategoryPage,
  ContactPage,
  ProductDetailPage,
  ShoppingCartPage,
} from './pages/SimplePages';
import { ForgotPasswordPage, LoginPage, RegisterPage } from './pages/AuthPages';
import {
  EditAccountPage,
  EditBillingPage,
  EditShippingPage,
  MyAccountPage,
} from './pages/AccountPages';
import {
  OrderDetailsPage,
  OrderSummaryPage,
  PaymentFormPage,
} from './pages/CheckoutPages';
import { NotFoundPage, TermsPage } from './pages/TermsAndNotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/product-detail" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/my-account" element={<MyAccountPage />} />
          <Route path="/edit-account" element={<EditAccountPage />} />
          <Route path="/edit-billing" element={<EditBillingPage />} />
          <Route path="/edit-shipping" element={<EditShippingPage />} />

          <Route path="/order-summary" element={<OrderSummaryPage />} />
          <Route path="/order-details" element={<OrderDetailsPage />} />
          <Route path="/payment-form" element={<PaymentFormPage />} />

          <Route path="/terms-conditions" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

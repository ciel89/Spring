// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage'; 
import SupportMain from './pages/support/SupportMain';
import Register from './components/Register';
import Login from './components/Login';
import MypageMain from './pages/mypage/Mypage';
import AdminPage from './pages/admin/AdminPage';
import ChangePassword from './pages/mypage/ChangePassword';
import Orders from './pages/mypage/Orders';
import OrderHistory from './pages/mypage/OrderHistory';
import Returns from './pages/mypage/Returns';
import ModifyOrderForm from './pages/mypage/ModifyOrderForm';
import CartPage from './pages/mypage/CartPage';
import ProductItem from './components/ProductItem';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductItem />} />
        <Route path="/support" element={<SupportMain />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MypageMain />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/order/:id" element={<Orders />} />
        <Route path="/my" element={<OrderHistory />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/orders/modify/:productId" element={<ModifyOrderForm />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;

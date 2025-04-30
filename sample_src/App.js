// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage'; // 예시용
import SupportMain from './pages/support/SupportMain';

import Register from './pages/Register';
import Login from './pages/Login';
import MypageMain from './pages/mypage/Mypage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<CategoryPage />} />

        <Route path="/support" element={<SupportMain />} />


        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/mypage" element={<MypageMain />} />
      </Routes>
    </Router>
  );
}

export default App;

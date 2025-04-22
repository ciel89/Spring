//import './App.css';
import React, {useEffect, useState} from "react";
import {Routes,Route, Link, useNavigate } from 'react-router-dom';
import { check, logout } from "./api/api";
import Home from "./pages/Home";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import ProductForm from "./pages/ProductForm";
import ProductList from "./pages/ProductList";

function App() {
  const [loginUser, setLoginUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    check().then(res => setLoginUser(res.data))
           .catch(()=>setLoginUser(null));
  },
    []);

    const handleLogout = async() => {
      await logout();
      setLoginUser(null);
      navigate('/');
    }
  return (
    <div className="App">
        <header>
          <Link to ="/"> 홈 </Link>
          { loginUser ? (
          <>
            <Link to ="/upload"> 상품등록 </Link>
            <Link to ="/my-products"> 내 상품 </Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>) : (
          <>
            <Link to ="/singup"> 회원가입 </Link>
            <Link to ="/login"> 로그인 </Link>
          </>)
          }
        </header>
        
        <Routes>
          <Route path="/" element={<Home loginUser={loginUser}/>}/>
          <Route path="/singup" element={<SignupForm/>}/>
          <Route path="/login" element={<LoginForm setLoginUser={setLoginUser}/>}/>
          <Route path="/upload" element={<ProductForm mode="create" loginUser={loginUser}/>} />
          <Route path="/my-products" element={<ProductList loginUser={loginUser} />} />
        </Routes>
    </div>
  );
}

export default App;

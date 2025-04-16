//import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductCreatPage from "./pages/ProductCreatePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>            
          <Route path="/products/new" element={<ProductCreatPage/>}/>
          <Route path="/products" element={<ProductListPage/>}/>
          <Route path="/products/:id" element={<ProductDetail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

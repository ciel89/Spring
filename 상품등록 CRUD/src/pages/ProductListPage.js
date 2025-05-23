import React ,{useEffect, useState}from "react";
import api from "../api";
import ProductItem from "../components/ProductItem";
import './ProductList.css';

function ProductListPage(){
    const [products, setProducts] = useState([]);
    //콤포넌트 마운트될때 서버에서 목록 가져오기
    useEffect(()=>{
        api.get("/products")
        .then(res => setProducts(res.data))
        .catch(err => console.log(err));
    },[]);
    return(
        <div className="product-list">
            <h2>상품 목록</h2>
            <div className="product-grid">
                {products.map(product => 
                    <ProductItem key={product.id} product={product}/>
                )}
            </div>  
            
        </div>
    );
}

export default ProductListPage;
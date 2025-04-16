import React ,{useEffect, useState}from "react";
import api from "../api";
import ProductItem from "../components/ProductItem";

function ProductListPage(){
    const [products, setProducts] = useState([]);
    //콤포넌트 마운트될때 서버에서 목록 가져오기
    useEffect(()=>{
        api.get("/products")
        .then(res => setProducts(res.data))
        .catch(err => console.log(err));
    },[]);
    return(
        <div>
            <h2>상품 목록</h2>
            {products.map(product => 
                <ProductItem key={product.id} product={product}/>
            )}
            
        </div>
    );
}

export default ProductListPage;
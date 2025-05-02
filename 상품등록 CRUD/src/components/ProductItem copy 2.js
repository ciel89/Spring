import React from "react";
import { Link } from "react-router-dom";
import './ProductItem.css';

function ProductItem({product}){
    return(
        <div style={{
            display: "flex",              // 가로 배치
            width: "800px",               // 전체 너비 제한
            alignItems: "center",         // 세로 중앙 정렬
            padding: "0.75rem 1rem",      // 내부 여백
            borderBottom: "1px solid #ddd", // 아래 경계선
            gap: "2rem"                   // 항목 간 간격
          }} >
            <div style={{width:"100px"}}>{product.name}</div>
            <div style={{width:"100px"}}>{product.description}</div>
            <div style={{width:"100px"}}>{product.price}</div>
            <div style={{width:"300px"}}>
                <img src={`http://3.39.144.111:8082${product.imagePath}`} 
                    alt={product.name} 
                    style={{ width: "200px", height: "auto"}} />
            </div>
            <div><Link to={`/products/${product.id}`} >편집</Link></div>
        </div>
    );
}

export default ProductItem;
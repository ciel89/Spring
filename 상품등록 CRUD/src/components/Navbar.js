import React from "react";
import {Link } from "react-router-dom";

function Navbar(){
    return(
        <div>
            <Link to="/" style={{margin:"10px"}}>홈</Link>
            <Link to="/products/new" style={{margin:"10px"}}>상품등록</Link>
            <Link to="/products" style={{margin:"10px"}}>상품조회</Link>
        </div>
    );
}
export default Navbar;
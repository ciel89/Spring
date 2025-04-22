import React from "react";
import { Link } from "react-router-dom";

export default function Home({loginUser}){
    return(
        <div>
            {loginUser ? (
                <>
                    <h2>환영합니다. {loginUser.name}님.</h2>
                    <p><Link to = "/my-products">내 상품 보러가기</Link></p>
                </>
            ) : (
                <>
                    <h2>쇼핑몰에 오신 걸 환영합니다.</h2>
                    <p>회원가입 또는 로그인 후 상품 등록이 가능합니다.</p>
                </>
            )}
        </div>
    );
}
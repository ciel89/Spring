import React,{useState} from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function LoginForm({setLoginUser}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await login({ email, password });
            const user = res.data;
            if ( !user || !user.id ) { alert('로그인 실패'); return;}

            setLoginUser(user);
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }
    return(
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="이메일" value={email} 
                        onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input type="password" placeholder="비밀번호" value={password} 
                        onChange={(e)=>setPassword(e.target.value)}/><br/>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}
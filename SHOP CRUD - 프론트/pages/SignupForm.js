import React, {useState} from "react";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SignupForm(){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        try{
            const res = signup({email,name,password});
            alert(res.data);
            navigate('/login');
        } catch (err) {
            alert(err.message);
        }
    }

    return(
        <div>
            <form onSubmit={handleSignup}>
                <h2>회원가입</h2>
                <input type="email" placeholder="이메일" value={email} 
                        onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input type="text" placeholder="이름" value={name} 
                        onChange={(e)=>setName(e.target.value)}/><br/>
                <input type="password" placeholder="비밀번호" value={password} 
                        onChange={(e)=>setPassword(e.target.value)}/><br/>
                <button type="submit">가입하기</button>
            </form>
        </div>
    );
}
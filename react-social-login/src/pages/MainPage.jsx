import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useOutletContext } from "react-router-dom";


function LoginInfo(){
    const { isLogin, setIsLogin } = useOutletContext();

    return(<div>
        {isLogin ? "로그인 성공":"로그인이 필요한 서비스입니다."}
    </div>);
}

export default LoginInfo;

import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "./api/getUserInfo";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(()=>{
    const initLogin = async () => {
      const newUser = await getUserInfo();
      setUser(newUser);
      setIsLogin(!!newUser.email);
    };
    initLogin();
  },[]);


  const onClick = async() => {
    const API_URL=process.env.REACT_APP_API_URL;
    const path='/v1/oauth2/logout';
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
    });
    setIsLogin(false);
    window.location.href="/";
  }

  return (
    <div>
      <div>
        <a href="/"><h1>Social Login</h1></a>
        {isLogin ? <a href="#none" onClick={onClick}>로그아웃</a>:<a href="/login">로그인</a>}
        <hr/>
      </div>
      <Outlet context={{isLogin, setIsLogin}}/>
    </div>
  );
}

export default App;

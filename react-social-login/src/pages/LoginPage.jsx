import { postLoginToken } from "../api/postLoginToken";
import GoogleLogin from "../components/GoogleLogin";
import { useOutletContext } from "react-router-dom";

function LoginPage(){
    const { isLogin, setIsLogin } = useOutletContext();

    const onGoogleSignIn = async res => {
        const { credential } = res;
        const result = await postLoginToken(credential);
        setIsLogin(result);
    };

    return(<div>
        <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="signin_with" />
    </div>);
}

export default LoginPage;

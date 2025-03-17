import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    return <div>
        <h1>Login Page</h1>
        <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" onClick={() => navigate('/home')}>Login</button>
        </form>
    </div>
}

export default Login;
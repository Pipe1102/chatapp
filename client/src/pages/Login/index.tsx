import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const buttonDisabled: boolean = username === "" || password === "";

  const { mutate } = useMutation(login, {
    onSuccess: (res: any) => {
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    },
  });

  const handleLogin = () => {
    mutate({ username, password });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="min-w-[600px] flex flex-col gap-10 justify-center items-center p-5 shadow-xl rounded">
        <h1 className="font-bold text-[24px] line-clamp-1">Login Form</h1>
        <input
          type="text"
          className="rounded border w-full p-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="rounded border w-full p-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          disabled={buttonDisabled}
          className="border rounded-lg p-2 min-w-[100px] bg-blue-600 hover:bg-blue-900 disabled:bg-gray-600"
        >
          <p className="text-white">Login</p>
        </button>
        <Link to="/register">Dont have an account? Register</Link>
      </div>
    </div>
  );
};

export default Login;

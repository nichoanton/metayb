import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { bikesImage } from "../assets"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        email: username,
        password: password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      const user = JSON.parse(atob(token.split('.')[1]));

      if (user.role === 'admin') {
        navigate("/dashboard");
      } else {
        navigate("/assemble");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid username or password. Please try again.");
    }
  };

  const handleResetPassword = () => {
    console.log("Reset password for", username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src={bikesImage} alt="Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">Username (Email)</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={handleResetPassword} className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

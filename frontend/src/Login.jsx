// src/Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        await login(username, password);
        // Optionally, redirect or show a success message here
    };

    const handleRegisterRedirect=()=>{
        navigate("/");
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            <div className="container">
              Don't have an account? 
              <button type='button' onClick={handleRegisterRedirect}>
              Register!
              </button>
            </div>
        </form>
    );
};

export default Login;

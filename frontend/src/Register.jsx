// src/Register.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        await register(username, password, email);
        // Optionally, redirect or show a success message here
    };
    const handleLoginRedirect=()=>{
        navigate("/login")
    }

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Register</button>
            <div className="container">
                already have an account? 
                <button onClick={handleLoginRedirect}>
                Login!
                </button>
            </div>
        </form>
    );
};

export default Register;

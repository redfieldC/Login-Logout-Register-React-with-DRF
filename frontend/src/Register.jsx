// src/Register.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Register = () => {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        await register(username, password, email);
        // Optionally, redirect or show a success message here
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

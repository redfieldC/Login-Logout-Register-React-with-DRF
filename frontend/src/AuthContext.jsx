import React, { createContext, useState, useContext } from 'react';
import { registerUser, loginUser, logoutUser } from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from './pages/List';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const navigate = useNavigate();
    const register = async (username, password, email) => {
      try {
        // Attempt to register the user by calling the backend API
        await registerUser(username, password, email);

        // Show success toast notification
        toast.success(`User with username "${username}" registered successfully!`);
        navigate("/login")
    } catch (error) {
        // Log the error response to help with debugging
        console.error('Registration error:', error);

        // Show an error toast notification
        toast.error("Oops! Something went wrong. Please try again.");

        // Log more error details if available
        if (error.response && error.response.data) {
            console.error('Error details:', error.response.data);
        } else {
            console.error('Unexpected error occurred:', error.message);
        }
    }
    };

    const login = async (username, password) => {
        const response = await loginUser(username, password);
        setUser(response.data.username);
        setRefreshToken(response.data.refresh);
    };

    const logout = async () => {
        await logoutUser(refreshToken);
        setUser(null);
        setRefreshToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

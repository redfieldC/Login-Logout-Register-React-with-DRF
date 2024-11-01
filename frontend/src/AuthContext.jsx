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
        if (error.response && error.response.data.type === "USERNAME_TAKEN") {
            toast.error("Username is already taken.");
        } 
        if (error.response && error.response.data.type === "EMAIL_TAKEN") {
            toast.error("EMAIL is already taken.");
        } 
        
        else {
            toast.error("Oops! Something went wrong. Please try again.");
        }
    }
    };

    const login = async (username, password) => {
        try {
            const response = await loginUser(username, password);
            setUser(response.data.username);
            setRefreshToken(response.data.refresh);
            toast.success("Login successful!");
            navigate("/list")
        } catch (error) {
            if (error.response && error.response.data.type === "INVALID_CREDENTIALS") {
                // Show a specific error message for invalid credentials
                toast.error("Invalid username or password. Please try again.");
            } else {
                // Generic error message for any other issues
                toast.error("Oops! Something went wrong. Please try again.");
            }
        }
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

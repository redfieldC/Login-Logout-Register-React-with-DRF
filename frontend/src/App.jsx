import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from 'react-toastify';
import Register from "./Register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import List from "./pages/List";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <div>
          <h1>Authentication with Django and React</h1>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword/>}/>
            <Route
                        path="/list"
                        element={
                            <ProtectedRoutes>
                                <List />
                            </ProtectedRoutes>
                        }
                    />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from 'react-toastify';
import Register from "./Register";

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <h1>Authentication with Django and React</h1>
        <Register />
        {/* <Login />
        <Logout /> */}
      </div>
    </AuthProvider>
  );
}

export default App;

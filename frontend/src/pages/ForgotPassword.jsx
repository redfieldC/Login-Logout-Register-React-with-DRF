import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP, 3: Reset Password
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/send-otp/', { email });
      setSuccess('OTP has been sent to your email');
      setError(null); // Clear any previous error
      setStep(2); // Move to next step (Verify OTP)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
      setSuccess(null); // Clear success message
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/verify-otp/', { email, otp });
      setSuccess('OTP verified. You can now set a new password.');
      setError(null); // Clear any previous error
      setStep(3); // Move to password reset step
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
      setSuccess(null); // Clear success message
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/reset-password/', { email, newPassword });
      setSuccess('Password reset successful. You can now log in.');
      setError(null); // Clear any previous error
      setStep(1); // Optionally, reset the flow back to the start
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
      setSuccess(null); // Clear success message
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword
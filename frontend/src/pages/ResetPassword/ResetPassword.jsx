import React, { useContext, useState } from "react";
import "./ResetPassword.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmMessage, setShowConfirmMessage] = useState("");
  const urlParams = window.location.href;
  const resetToken = urlParams.slice(37)
  console.log("Reset Token:", resetToken);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    // handle password reset logic here
    e.preventDefault();

    try {
      if (password === confirmPassword) {
        const response = await axios.post(
          `http://localhost:4000/api/user/reset-password/${resetToken}`,
          { password }
        );
        if (response.data.success) {
          // Redirect to login page or update state to show success message
          console.log("Password reset successful");
          navigate("/")
        } else {
          console.log("Password reset failed");
        }
      } else {
        setShowConfirmMessage(
          <p className="error">Passwords do not match.</p>
        );
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="forgot-password">
      <h1>Reset Password Page</h1>
      <p>Enter your new password below:</p>
      <form onSubmit={handleSumbit}>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="New Password"
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
        />
        {showConfirmMessage}
        <button type="submit">Reset Password</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="link" to="/signup">
          Sign Up
        </Link>{" "}
      </p>
    </div>
  );
};

export default ResetPassword;
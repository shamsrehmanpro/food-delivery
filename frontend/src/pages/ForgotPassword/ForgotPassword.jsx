import React, { useContext, useState } from "react";
import "./ForgotPassword.css";
import axios from "axios"; // Import axios
import ResetPassword from "../ResetPassword/ResetPassword";
import { StoreContext } from "../../Context/StoreContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {resetToken, setResetToken} = useContext(StoreContext)
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/forgot-password",
        { email }
      );

      if (response.data.success) {
        setSuccess("Password reset email send to your email address");
        setEmail(""); // Clear email input after success
        
        
      } else {
        setError("Password reset email send to your email address");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <p>Enter your email address to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Email</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default ForgotPassword;

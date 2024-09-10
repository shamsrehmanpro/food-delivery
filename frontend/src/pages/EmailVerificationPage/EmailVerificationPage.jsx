import React, { useRef, useState } from "react";
import "./EmailVerificationPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.jsx";

const EmailVerificationPage = () => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  let {setToken } = useContext(StoreContext);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Log the current OTP (including the complete 6 digits)
    console.log('Current OTP:', otp.join(''));
  };


  const handlePaste = (event) => {
    event.preventDefault(); // Prevent default paste behavior

    const clipboardData = event.clipboardData || new Clipboard();
    const pastedData = clipboardData.getData('text');

    // Check if pasted data is a 6-digit string
    if (pastedData.length === 6 && pastedData.match(/^\d+$/)) {
      // Update all input boxes with the pasted data
      setOtp(pastedData.split(''));

      // Focus on the last input box
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/verify-email",
        { code: otp.join('') }
      );

      if (response.data.success) {
        console.log("Email verified successfully!");
        console.log("Token:", response.data.token); // Log the token

        // Store the token in local storage (optional)
        setToken(response.data.token)
        localStorage.setItem('userToken', response.data.token);

        // Use the token for subsequent requests (if needed)
        // ...

        navigate("/"); // Redirect to home page on success
      } else {
        alert(response.data.message); // Display error message
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="email-verify">
      <div>
        <h2>Verify Your Email...</h2>
        <p>Enter the six digits code send to your email address.</p>

        <form action="">
          <div className="otp-input">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                ref={(ref) => (inputRefs.current[index] = ref)}
                onPaste={handlePaste} // Add onPaste event handler
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && index === 0) {
                    handlePaste(e); // Trigger paste on Enter in the first box
                  }
                }}
              />
            ))}
          </div>
          <button type="button" onClick={handleSubmit}>Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
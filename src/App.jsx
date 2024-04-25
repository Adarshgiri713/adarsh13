import React, { useState } from "react";
export const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const initialPhoneNumber = "9793991560";
  const initialOtp = "2423";
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://your-api-url.com/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (response.ok) {
        setMessage("Account deleted successfully");
      } else {
        setMessage("Failed to delete account. Please try again");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again");
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </label>
        <br />
        <label>
          OTP:
          <input type="text" value={otp} onChange={handleOtpChange} required />
        </label>
        <br />
        <button type="submit">Delete Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

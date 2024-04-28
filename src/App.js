import React, { useState } from "react";
const App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(true);
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
        body: JSON.stringify({ phoneNumber }),
      });
      if (response.ok) {
        setMessage("Account deleted successfully");
        setStatus(false);
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
      {status ? (
        <>
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
          <button onClick={handleSubmit}>Enter Number</button>
        </>
      ) : (
        <>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={handleOtpChange} required />
          <button>Enter OTP</button>
          <br />
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};
export default App;

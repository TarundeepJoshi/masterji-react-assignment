import React, { useState } from "react";
import "../App.css";

function OtpForm() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") {
      setIsSuccess(true);
      setIsError(false);
      const button = document.querySelector("button");
      button.style.backgroundColor = "#23CF9B";
      button.innerHTML = "Verified";
      otp.forEach((_, i) => {
        document.getElementById(`otp-input-${i}`).style.border =
          "1px solid #23CF9B";
      });
    } else {
      setIsError(true);
      setIsSuccess(false);
      const button = document.querySelector("button");
      button.style.backgroundColor = "#EB2D5B";
      button.innerHTML = "Verification failed";
      otp.forEach((_, i) => {
        document.getElementById(`otp-input-${i}`).style.outline =
          "1px solid #EB2D5B";
      });
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setIsSuccess(false);
    setIsError(false);
    const button = document.querySelector("button");
    button.style.backgroundColor = "#112D4E";
    button.innerHTML = "Verify Account";
    otp.forEach((_, i) => {
      document.getElementById(`otp-input-${i}`).style.border =
        "1px solid #DBE2EF";
      document.getElementById(`otp-input-${i}`).style.outline = "none";
    });
  };

  return (
    <div className="otp-bg">
      <div className="flex flex-col justify-center items-center">
        <h1
          className="main-text text-4xl text-white font-bold mb-4"
          style={{
            fontFamily: "Inter, sans-serif",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          Chai aur Code
        </h1>
        <div
          className="bg-[#F9F7F7] rounded-lg text-center font-sans"
          style={{
            fontFamily: "DM Sans, sans-serif",
            boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          <h2 className="mb-1 mt-2 text-black text-2xl font-bold">
            Mobile Phone Verification
          </h2>
          <p className="mb-3 px-6 text-[#BFBFBF]">
            Enter the 4-digit verification code that was sent to <br /> your
            phone number.
          </p>
          <div className="flex gap-[19px] justify-center mb-4">
            {otp.map((digit, index) => (
              <input
                className="otp-input"
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#112D4E] text-white w-[17.5rem] p-1.5 rounded-[4px]"
          >
            Verify Account
          </button>
          <p className="p-4 text-[#BFBFBF]">
            Didn’t receive code?{" "}
            <button
              className="text-[#112D4E] hover:underline"
              onClick={handleResend}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtpForm;

import React from "react";

const BrandingLogo = () => {
  return (
    <a
      href="https://chaicode.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "3rem",
        right: "4rem",
        textDecoration: "none",
        color: "#000",
      }}
    >
      <img
        src="https://i.ibb.co/t3m0KSP/logo.png"
        alt="Branding Logo"
        style={{ width: "70px", height: "70px" }}
      />
    </a>
  );
};

export default BrandingLogo;

import React, { useState } from "react";
import { createPortal } from "react-dom";

// Custom Popup Component using Portal
const LogoutPopup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const popupContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose} // Close when clicking backdrop
    >
      <div
        style={{
          backgroundColor: "white",
          border: "2px solid black",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking popup content
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "black",
            margin: "0 0 16px 0",
          }}
        >
          Logout Successful
        </h3>
        <p
          style={{
            color: "#374151",
            margin: "0 0 24px 0",
            fontSize: "14px",
          }}
        >
          You have been logged out successfully!
        </p>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "8px 24px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#374151")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          OK
        </button>
      </div>
    </div>
  );

  // Render popup in a portal to avoid layout issues
  return createPortal(popupContent, document.body);
};
export default LogoutPopup;

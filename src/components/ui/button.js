import React from "react";

export const Button = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={`p-2 rounded ${className}`}>
      {children}
    </button>
  );
};

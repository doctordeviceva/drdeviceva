import React from "react";

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export const Label = ({ children, className = "", htmlFor }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
);

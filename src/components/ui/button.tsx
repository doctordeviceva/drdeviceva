import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: unknown;
}

export const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

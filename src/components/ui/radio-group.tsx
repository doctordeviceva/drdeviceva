import React from "react";

interface RadioGroupProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const RadioGroup = ({
  children,
  value,
  onValueChange,
  className = "",
}: RadioGroupProps) => <div className={`space-y-3 ${className}`}>{children}</div>;

interface RadioGroupItemProps {
  value: string;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioGroupItem = ({
  value,
  id,
  checked,
  onChange,
}: RadioGroupItemProps) => (
  <input
    type="radio"
    id={id}
    value={value}
    checked={checked}
    onChange={onChange}
    className="h-4 w-4 border-primary text-primary focus:ring-primary"
  />
); 
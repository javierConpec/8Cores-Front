import React from "react";
import { LucideIcon } from "lucide-react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  htmlFor: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: LucideIcon;
}

const Input = ({
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
  htmlFor,
  id,
  icon: Icon,
}: InputProps) => {
  return (
    <div className="relative w-1/2">
      {Icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500 ">
          <Icon size={16}  className="text-text-500"/>
        </span>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`peer w-full p-3 text-text-900 border border-accent-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 placeholder-transparent dark:bg-background-200  text-xs md:text-[14px]
          ${Icon ? "pl-10" : ""} 
          ${error ? "border-red-500" : "border-text-300"}
        `}
        placeholder=""
      />
      <label
        htmlFor={htmlFor}
        className={`absolute text-xs md:text-[14px] left-8 md:left-10 top-3 text-text-500 text-base transition-all 
        peer-placeholder-shown:left-10 peer-placeholder-shown:top-3 peer-placeholder-shown:text-text-700 
        peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-text-500 bg-background-0 dark:bg-background-200 px-1 
        ${value ? "opacity-0" : "opacity-100"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

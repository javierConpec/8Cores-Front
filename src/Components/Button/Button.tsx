import React from "react";

interface ButtonProps {
  id?: string;
  icon?: React.ReactNode;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "cat" | "detail" | "sesion" | "addCart" | "buy" | "deleteUser";
  type?: "button" | "submit" | "reset";
}

const Button = ({
  icon,
  text,
  onClick,
  isLoading = false,
  disabled = false, //
  variant = "sesion",
  type = "button",
}: ButtonProps) => {
  const baseStyle =
    "py-2 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-50 active:scale-95 transition-all flex items-center justify-center gap-2";

  const variantStyle = {
    cat: 
      "text-text bg-secondary-300 mx-2 hover:bg-secHover font-medium rounded-lg px-3 py-1 text-center w-[190px] 2xl:w-[200px] hidden md:flex",
    sesion:
      "text-text-100 p-3 text-center bg-primary-500 mt-5 w-full hover:bg-primary-400 font-medium rounded-lg ",
    detail:
      "text-white bg-blue mx-2 hover:bg-blue-900 font-medium rounded-lg pl-2 py-1 text-center",
    addCart:
      "text-text-100 p-3 text-center bg-primary-500 mt-5 w-full hover:bg-primary-400 text-sm md:text-md font-medium rounded-lg ",
    buy: 
      "bg-accent-700 text-text-100 mt-2 hover:bg-accent-200 font-medium rounded-lg pl-2 py-1 text-center w-full",
    deleteUser:
      "bg-secondary-700 text-text-100 mt-5 hover:bg-secondary-200 font-medium rounded-lg pl-2 py-1 text-center w-full",
  }[variant];

  return (
    <button
      type={type}
      className={`${baseStyle} ${variantStyle} ${
        isLoading || disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        "Cargando..."
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};

export default Button;

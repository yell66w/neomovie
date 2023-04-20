import { ButtonHTMLAttributes } from "react";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: any;
  endIcon?: any;
  variant?: string;
}
const Button = ({
  startIcon,
  endIcon,
  children = "Click Me!",
  variant = "primary",
  ...rest
}: Props) => {
  let buttonClassVariant = "bg-primary text-black";
  if (variant === "secondary") {
    buttonClassVariant = "bg-neutral text-white";
  }

  return (
    <button
      {...rest}
      className={`flex items-center justify-center gap-2.5 ${buttonClassVariant} text-xs font-bold px-4 h-10 rounded-lg  transition ease-in-out hover:scale-110 duration-200`}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default Button;

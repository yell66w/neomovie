import { ButtonHTMLAttributes } from "react";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: any;
  endIcon?: any;
}
const Button = ({
  startIcon,
  endIcon,
  children = "Click Me!",
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      className={`w-full flex items-center justify-center gap-2.5 bg-primary text-black text-xs font-bold px-4 h-10 rounded-lg drop-shadow-2xl shadow-primary transition ease-in-out hover:scale-110 duration-200`}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default Button;

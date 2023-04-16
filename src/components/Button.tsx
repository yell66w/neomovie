import { ButtonHTMLAttributes } from "react";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}
const Button = ({
  className,
  children = "Click Me!",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className={`${className} bg-primary text-black text-xs font-bold px-4 h-10 rounded-lg drop-shadow-2xl shadow-primary transition ease-in-out hover:scale-110 duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;

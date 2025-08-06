import type { ReactElement } from "react";

type variants = "primary" | "secondary";
type size = "sm" | "md" | "lg";

interface ButtonProps {
  variants: variants;
  text: string;
  size: size;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;

}

const variantsStyle = {
  primary: "bg-[#036ca1] text-white",
  secondary: "bg-[#94d6f7] text-[#036ca1]",
}

const sizeStyle = {
  sm: "px-3 py-2",
  md: "px-5 py-3",
  lg: "px-7 py-4",
}

const defaultStyle = "rounded-md font-normal m-2";

export const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} className={`${variantsStyle[props.variants]} ${defaultStyle} ${sizeStyle[props.size ?? 'md']} flex justify-center hover:bg-[#0284C7] trasition-all hover:duration-300 hover:scale-105`}>
      <div className="flex items-center gap-2">
        {props.startIcon}
        {props.text}
        {props.endIcon}
      </div>
    </button>
  )
}
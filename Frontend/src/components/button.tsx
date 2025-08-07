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
};

const sizeStyle = {
  sm: "px-3 py-2",
  md: "px-5 py-3",
  lg: "px-7 py-4",
};

const defaultStyle =
  "rounded-lg font-medium transition-all duration-200 hover:shadow-lg active:scale-95 w-full flex justify-center items-center";

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantsStyle[props.variants]} ${defaultStyle} ${
        sizeStyle[props.size ?? "md"]
      }`}
    >
      <div className="flex items-center gap-2">
        {props.startIcon}
        <span className="font-medium">{props.text}</span>
        {props.endIcon}
      </div>
    </button>
  );
};

import { iconSizeVariants, type IconsProps } from ".";

export const BrainIcon = (props: IconsProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={iconSizeVariants[props.size]}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 003.75-15.258 13.6 13.6 0 01-11.196 0c1.485 7.417 1.84 14.815-7.274 15.746"
      />
    </svg>
  );
};

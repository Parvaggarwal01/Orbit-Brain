import { iconSizeVariants, type IconsProps } from ".";

export const SortIcon = (props: IconsProps) => {
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
        d="M3 7h18M3 12h12m-9 5h6"
      />
    </svg>
  );
};

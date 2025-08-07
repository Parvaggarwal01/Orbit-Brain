interface InputProps {
  placeholder: string;
  reference?: React.RefObject<HTMLInputElement>;
  type: string;
}

export function Input({ placeholder, reference, type }: InputProps) {
  return (
    <div className="w-full">
      <input
        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50 focus:bg-white"
        placeholder={placeholder}
        ref={reference}
        type={type}
      />
    </div>
  );
}

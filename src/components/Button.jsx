export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "px-4 py-2 rounded-lg font-medium transition-shadow active:scale-[.99]";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}

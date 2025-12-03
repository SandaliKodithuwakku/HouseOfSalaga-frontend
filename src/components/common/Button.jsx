const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  icon,
  ...props 
}) => {
  const baseStyles = 'w-full flex items-center justify-center gap-3 py-3 px-4 font-medium rounded-md transition-colors duration-200 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#8B6B47] hover:bg-[#6F5639] text-white disabled:bg-gray-400',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
    outline: 'border-2 border-[#8B6B47] text-[#8B6B47] hover:bg-[#8B6B47] hover:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  error, 
  register, 
  name,
  validation,
  className = '',
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...(register ? register(name, validation) : {})}
        className={`w-full px-4 py-3 bg-white border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B6B47] focus:border-transparent text-gray-700 placeholder-gray-400 transition-colors`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default Input;
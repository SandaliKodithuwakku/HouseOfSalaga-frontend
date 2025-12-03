import { Link } from 'react-router-dom';

const Checkbox = ({ 
  id, 
  checked, 
  onChange, 
  label, 
  linkText,
  linkTo,
  className = '' 
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 text-[#8B6B47] focus:ring-[#8B6B47] border-gray-300 rounded cursor-pointer"
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer">
        {label}{' '}
        {linkText && linkTo && (
          <Link to={linkTo} className="text-[#8B6B47] hover:underline font-medium">
            {linkText}
          </Link>
        )}
      </label>
    </div>
  );
};

export default Checkbox;
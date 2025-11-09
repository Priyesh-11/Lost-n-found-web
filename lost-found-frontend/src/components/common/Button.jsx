const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  disabled, 
  type = 'button',
  className = '',
  icon: Icon,
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark disabled:bg-gray-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-300',
    ghost: 'text-primary hover:bg-blue-50 disabled:text-gray-400',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${sizes[size]}
        rounded-lg font-medium
        transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-60
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;

const Card = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md 
        ${hoverable ? 'hover:shadow-xl transition-shadow duration-300 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

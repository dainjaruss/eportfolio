// pass variant="outline" for the bordered style, default is solid
const Button = ({ children, onClick, variant = 'default', className = '', ...rest }) => {
  return (
    <button className={`btn btn-${variant} ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;

const CardFooter = ({ children, className = '' }) => {
  return (
    <footer className={`card-footer ${className}`}>
      {children}
    </footer>
  );
};

export default CardFooter;

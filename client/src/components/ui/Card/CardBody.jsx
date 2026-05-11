const CardBody = ({ children, className = '' }) => {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  );
};

export default CardBody;

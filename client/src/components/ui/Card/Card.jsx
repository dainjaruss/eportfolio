// base wrapper — where the card stuff passes through
const Card = ({ children, className = '', id }) => {
  return (
    <article className={`card ${className}`} id={id}>
      {children}
    </article>
  );
};

export default Card;

const CardHeader = ({ title, subtitle, id }) => {
  // only set the id attr if needed to avoid empty id="" in the DOM
  const hId = id ? `card-title-${id}` : undefined;

  return (
    <header className="card-header">
      {title && <h3 className="card-title" id={hId}>{title}</h3>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </header>
  );
};

export default CardHeader;

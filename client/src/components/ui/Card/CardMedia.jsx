// 16:9 image block with optional overlay link
const CardMedia = ({ src, alt, overlay }) => {
  return (
    <div className="card-media">
      <img src={src} alt={alt} className="card-media-img" />
      {overlay && <div className="card-media-overlay">{overlay}</div>}
    </div>
  );
};

export default CardMedia;

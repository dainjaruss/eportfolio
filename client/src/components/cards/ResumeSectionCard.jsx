import useToggle from '../../hooks/useToggle';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardBody from '../ui/Card/CardBody';
import CardFooter from '../ui/Card/CardFooter';
import Button from '../ui/Button';
import Tag from '../ui/Tag';

// collapsible section — shows tag preview when collapsed, full grid when expanded
// tried to reduce the amount of scrolling required
const ResumeSectionCard = ({ title, items, renderPreview, children }) => {
  const [expanded, toggleExpanded] = useToggle(false);

  return (
    <>
      {!expanded ? (
        <Card className="resume-section-card">
          <CardHeader title={title} />
          <CardBody>
            <div className="tag-row">
              {items.map((item, idx) => (
                <Tag key={idx} label={renderPreview(item)} />
              ))}
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="outline" onClick={toggleExpanded}
              aria-expanded={expanded} className="toggle-btn">
              Show details
            </Button></CardFooter></Card>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="resume-section-label" style={{ margin: 0 }}>{title}</h3>
            <Button variant="outline" onClick={toggleExpanded}
              aria-expanded={expanded} className="toggle-btn">
              Collapse
            </Button>
          </div>
          <div className="cards-grid">{children}</div>
        </>
      )}
    </>
  );
};

export default ResumeSectionCard;

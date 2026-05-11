import useToggle from '../../hooks/useToggle';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardBody from '../ui/Card/CardBody';
import CardFooter from '../ui/Card/CardFooter';
import Button from '../ui/Button';

const AboutCard = ({ title, id, children, collapsible = false }) => {
  const [expanded, toggleExpanded] = useToggle(false);

  return (
    <Card className="about-card" id={id}>
      <CardHeader title={title} id={id} />

      <CardBody className={collapsible && !expanded ? 'clamped' : ''}>
        {children}
      </CardBody>

      {collapsible && (
        <CardFooter>
          <Button variant="outline" onClick={toggleExpanded}
            aria-expanded={expanded} className="toggle-btn">
            {expanded ? 'Read less' : 'Read more'}
          </Button></CardFooter>
      )}
    </Card>
  );
};

export default AboutCard;

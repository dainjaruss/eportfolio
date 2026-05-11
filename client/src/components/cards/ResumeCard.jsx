import useToggle from '../../hooks/useToggle';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardBody from '../ui/Card/CardBody';
import CardFooter from '../ui/Card/CardFooter';
import Button from '../ui/Button';

// works for both job entries and project entries — prob could be cleaner
const ResumeCard = ({ title, subtitle, date, summary, bullets }) => {
  const [expanded, toggleExpanded] = useToggle(false);
  const hasContent = summary || bullets?.length > 0;

  return (
    <Card className="resume-card">
      <CardHeader title={title} subtitle={subtitle} />

      <CardBody>
        {date && <p className="resume-date">{date}</p>}

        <div className={`resume-summary ${expanded ? 'expanded' : ''}`}>
          {summary && <p>{summary}</p>}
          {bullets?.length > 0 && (
            <ul className="resume-bullets">
              {bullets.map((b, idx) => <li key={idx}>{b}</li>)}
            </ul>
          )}
        </div>
      </CardBody>

      {hasContent && (
        <CardFooter>
          <Button variant="outline" onClick={toggleExpanded}
            aria-expanded={expanded} className="toggle-btn">
            {expanded ? 'Show less' : 'Show more'}
          </Button></CardFooter>
      )}
    </Card>
  );
};

export default ResumeCard;

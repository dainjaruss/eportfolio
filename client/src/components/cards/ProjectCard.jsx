import useToggle from '../../hooks/useToggle';
import Card from '../ui/Card/Card';
import CardHeader from '../ui/Card/CardHeader';
import CardMedia from '../ui/Card/CardMedia';
import CardBody from '../ui/Card/CardBody';
import CardFooter from '../ui/Card/CardFooter';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

// Devicon CDN — Reference https://github.com/devicons/devicon/blob/master/README.md
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const tool_icons = {
  'Next.js':    { slug: 'nextjs/nextjs-original',           color: '#000000' },
  'React':      { slug: 'react/react-original',             color: '#61DAFB' },
  'Node.js':    { slug: 'nodejs/nodejs-original',           color: '#339933' },
  'Tailwind':   { slug: 'tailwindcss/tailwindcss-original', color: '#06B6D4' },
  'PostgreSQL': { slug: 'postgresql/postgresql-original',   color: '#4169E1' },
  'Bash':       { slug: 'bash/bash-original',               color: '#4EAA25' },
  'Linux':      { slug: 'linux/linux-original',             color: '#FCC624' },
  'iOS':        { slug: 'apple/apple-original',             color: '#555555' },
  'Android':    { slug: 'android/android-original',         color: '#3DDC84' },
  'SQL':        { slug: 'mysql/mysql-original',             color: '#4479A1' },
};

const ToolBadge = ({ label }) => {
  const icon_info = tool_icons[label];

  if (icon_info) {
    return (
      <span className="badge tool-badge" style={{ '--tool-color': icon_info.color }}>
        <img src={`${DEVICON}/${icon_info.slug}.svg`} alt="" className="tool-badge__icon" aria-hidden="true" />
        {label}
      </span>
    );
  }

  // using plain badge where no devicon exist
  return <Badge label={label} />;
};

const ProjectCard = ({ project }) => {
  const [expanded, toggleExpanded] = useToggle(false);
  const [liked, toggleLiked] = useToggle(false);

  const overlay = project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-link">
      Check it out
    </a>
  ) : null;

  return (
    <Card className="project-card" id={project.id}>
      <CardMedia src={project.image} alt={`Screenshot: ${project.title}`} overlay={overlay} />
      <CardHeader title={project.title} id={project.id} subtitle={project.category} />

      <CardBody>
        {project.status === 'in-progress' && (
          <span className="status-badge status-badge--wip">🚧 In Progress</span>
        )}

        <p className={`project-desc ${expanded ? 'expanded' : ''}`}>
          {project.description}
        </p>

        {project.tools?.length > 0 && (
          <div className="badge-row">
            {project.tools.map((t) => <ToolBadge key={t} label={t} />)}
          </div>
        )}
      </CardBody>

      <CardFooter>
        <Button variant="outline" onClick={toggleExpanded}
          aria-expanded={expanded} className="toggle-btn">
          {expanded ? 'Less' : 'More...'}
        </Button>

        <Button variant="outline" onClick={toggleLiked}
          aria-pressed={liked} className={`like-btn ${liked ? 'liked' : ''}`}>
          {liked ? '❤️ Loved' : '🤍 Like'}
        </Button></CardFooter></Card>
  );
};

export default ProjectCard;

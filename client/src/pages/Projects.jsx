import ProjectCard from '../components/cards/ProjectCard';
import useFetch from '../hooks/useFetch';
import { fetchProjects } from '../services/projectsService';

const BASE = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');


// renders the projects grid - data now comes from the express backend
// data lives in express-dain-franklyn-week6/data/projects.json
const Projects = () => {
  const { data: projects, loading, error } = useFetch(fetchProjects);

  if (loading) return (
    <section className="page-section"><p>Loading projects...</p></section>
  );

  if (error) return (
    <section className="page-section">
      <p className="error-message">Could not load projects: {error}</p>
    </section>
  );

  // Only prepend BASE if the image is a relative path (doesn't start with http)
  const remapped = projects.map(p => {
    const imageUrl = p.image?.startsWith('http') ? p.image : `${BASE}${p.image}`;
    return { ...p, image: imageUrl };
  });


  return (
    <section className="page-section" aria-label="Projects">
      <div className="cards-grid">
        {remapped.map((p, idx) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div> </section>
  );
};

export default Projects;

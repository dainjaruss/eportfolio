import Card from '../components/ui/Card/Card';
import CardHeader from '../components/ui/Card/CardHeader';
import CardBody from '../components/ui/Card/CardBody';
import resumeData from '../data/resume.json';

const Resume = () => {
  const workHistory = resumeData;

  return (
    <section className="page-section" aria-labelledby="resume">
      <div className="cards-grid">

        <Card id="core-skills">
          <CardHeader title="Core Competencies" id="core-skills" />
          <CardBody>
            <ul className="skill-list" style={{ paddingLeft: '1.2rem' }}>
              {workHistory.coreCompetencies.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card id="tech-projects">
          <CardHeader title="Hobby Projects" id="tech-projects" />
          <CardBody>
            {workHistory.technicalProjects.map((proj, i) => (
              <div key={i} className="resume-entry" style={{ marginBottom: '1rem' }}>
                <strong>{proj.name} — {proj.type}</strong>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted-text)' }}>{proj.date}</div>
                <p style={{ fontSize: '0.9rem' }}>{proj.summary}</p>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card id="experience">
          <CardHeader title="Work Experience" id="experience" />
          <CardBody>
            {workHistory.workExperience.map((job, i) => (
              <div key={i} className="resume-entry" style={{ marginBottom: '1rem' }}>
                <strong>{job.title} | {job.company}</strong>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted-text)' }}>{job.date}</div>
                <p style={{ fontSize: '0.9rem' }}>{job.summary}</p>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* certs + education share a column — they're short enough */}
        <div className="resume-col-stack">
          <Card id="certs">
            <CardHeader title="Certifications" id="certs" />
            <CardBody>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {workHistory.certifications.map((c, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{c.title}</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted-text)' }}>{c.issuer}</div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card id="education">
            <CardHeader title="Formal Education" id="education" />
            <CardBody>
              {workHistory.education.map((edu, idx) => (
                <div key={idx} className="resume-entry" style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '1rem' }}>{edu.credential}</strong>
                  <p style={{ margin: '0', fontSize: '0.9rem' }}>{edu.institution}</p>
                </div>
              ))}
            </CardBody>
          </Card> </div> </div> </section>
  );
};

export default Resume;

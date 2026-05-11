import AboutCard from '../components/cards/AboutCard';
import aboutData from '../data/about.json';

const About = () => {
  const bio = aboutData.biography[0];

  return (
    <section className="page-section" aria-labelledby="about-heading">
      <h2 id="about-heading" className="visually-hidden">About Me</h2>
      <div className="cards-grid">

        <AboutCard title="Who I Am" id="identity" collapsible>
          <p>{bio.identity}</p>
        </AboutCard>

        <AboutCard title="Service History" id="service" collapsible>
          <p>{bio.enlistment}</p>
          <p>{bio.operationalAssignments}</p>
          <p>{bio.otherAssignments}</p>
        </AboutCard>

        <AboutCard title="Awards & Recognitions" id="awards">
          <p><strong>Unit Awards:</strong> {bio.unitAwards}</p>
          <p><strong>Personal Awards:</strong> {bio.personalAwards}</p>
        </AboutCard>

      </div> </section>
  );
};

export default About;

import Card from '../components/ui/Card/Card';
import CardBody from '../components/ui/Card/CardBody';

const Home = () => {
  return (
    <section className="page-section">
      <Card className="home-card">
        <CardBody>
          <div className="home-hero">
            <div className="profile-img-container">
              <img src="https://pub-315a9cc05be14c9582ad7c7faa33759d.r2.dev/me.jpg" alt="Profile" className="profile-img" />
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              I'm a U.S. Navy senior leader with 20+ years leading mission-critical systems and
              high-reliability operations. I'm focused on DevSecOps, DevOps, and full-stack
              development—automating secure workflows, scripting in Python and BASH, and
              building web platforms.
            </p>
          </div>
        </CardBody> </Card> </section>
  );
};

export default Home;

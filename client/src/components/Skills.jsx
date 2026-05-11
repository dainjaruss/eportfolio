import React from 'react';
import Card from './ui/Card/Card';
import CardHeader from './ui/Card/CardHeader';
import CardBody from './ui/Card/CardBody';

// breakdown of the stack and soft skills
const Skills = ({ technicalData }) => {
  return (
    <section className="page-section">
      <div className="cards-grid">
        <Card id="tech-stack">
          <CardHeader title="Tech Stack" id="tech-stack" />
          <CardBody>
            <ul className="skill-list" style={{ paddingLeft: '1.2rem' }}>
              {technicalData.technical.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </CardBody></Card>

        <Card id="soft-skills">
          <CardHeader title="Other Skills" id="soft-skills" />
          <CardBody>
            <ul className="skill-list" style={{ paddingLeft: '1.2rem' }}>
              {technicalData.soft.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardBody></Card>
      </div></section>
  );
};

export default Skills;

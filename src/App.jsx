import React from 'react';
import PersonalInfo from './components/PersonalInfo';
import ProfessionalSkills from './components/ProfessionalSkills';
import Portfolio from './components/Portfolio';
import LifeModule from './components/LifeModule';
import ScrollProgress from './components/ScrollProgress';
import FloatingParticles from './components/FloatingParticles';
import MobileNavigation from './components/MobileNavigation';

function App() {
  return (
    <div className="app-container">
      <ScrollProgress />
      <FloatingParticles />
      <MobileNavigation />
      
      <section id="personal" className="app-section">
        <PersonalInfo />
      </section>
      
      <section id="skills" className="app-section">
        <ProfessionalSkills />
      </section>
      
      <section id="portfolio" className="app-section">
        <Portfolio />
      </section>
      
      <section id="life" className="app-section">
        <LifeModule />
      </section>
    </div>
  );
}

export default App;
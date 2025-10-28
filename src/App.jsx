import React, { useEffect } from 'react';
import PersonalInfo from './components/PersonalInfo';
import ProfessionalSkills from './components/ProfessionalSkills';
import Portfolio from './components/Portfolio';
import LifeModule from './components/LifeModule';
import ScrollProgress from './components/ScrollProgress';
import FloatingParticles from './components/FloatingParticles';
import MobileNavigation from './components/MobileNavigation';
import AnimatedFavicon from './utils/animatedFavicon';

function App() {
  useEffect(() => {
    const favicon = new AnimatedFavicon();
    favicon.start(200); // Change frame every 200ms for faster, smoother animation

    // Cleanup function to stop animation when component unmounts
    return () => {
      favicon.stop();
    };
  }, []);

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
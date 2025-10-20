import React from 'react'
import PersonalInfo from './components/PersonalInfo'
import ProfessionalSkills from './components/ProfessionalSkills'
import Portfolio from './components/Portfolio'
import ScrollProgress from './components/ScrollProgress'
import FloatingParticles from './components/FloatingParticles'

function App() {
  return (
    <div className="app-container">
      <ScrollProgress />
      <FloatingParticles />
      
      {/* 个人信息模块 */}
      <section id="personal-info" className="app-section">
        <PersonalInfo />
      </section>
      
      {/* 专业能力模块 */}
      <section id="professional-skills" className="app-section">
        <ProfessionalSkills />
      </section>
      
      {/* 作品集模块 */}
      <section id="portfolio" className="app-section">
        <Portfolio />
      </section>
    </div>
  )
}

export default App
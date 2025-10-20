import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Code, Database, Globe, Smartphone, Award, BookOpen } from 'lucide-react'

const ProfessionalSkills = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)

  const skills = [
    {
      category: "前端技术",
      icon: <Code className="w-8 h-8" />,
      items: [
        { name: "JavaScript", level: 95 },
        { name: "Vue.js", level: 90 },
        { name: "HTML5/CSS3", level: 92 },
        { name: "TypeScript", level: 80 },
        { name: "HTTP/Axios", level: 88 },
        { name: "UI组件库", level: 85 }
      ]
    },
    {
      category: "工程化工具",
      icon: <Globe className="w-8 h-8" />,
      items: [
        { name: "Git", level: 90 },
        { name: "Vite", level: 85 },
        { name: "Webpack", level: 80 },
        { name: "CI/CD", level: 75 },
        { name: "代码管理", level: 88 }
      ]
    },
    {
      category: "后端技术",
      icon: <Database className="w-8 h-8" />,
      items: [
        { name: "Python", level: 85 },
        { name: "Django", level: 80 },
        { name: "RESTful API", level: 82 },
        { name: "PostgreSQL", level: 78 },
        { name: "Redis", level: 75 }
      ]
    },
    {
      category: "数据处理",
      icon: <Smartphone className="w-8 h-8" />,
      items: [
        { name: "Cesium.js", level: 88 },
        { name: "Echarts", level: 85 },
        { name: "DataV", level: 80 },
        { name: "Three.js", level: 75 },
        { name: "WebGL", level: 70 }
      ]
    }
  ]

  const education = [
    {
      degree: "测绘工程硕士",
      school: "长江大学·武汉大学（联合培养）",
      period: "2023.9 - 2026.6",
      description: "地理信息系统方向，计算机科学与技术本科"
    },
    {
      degree: "计算机科学与技术学士",
      school: "湖北汽车工业学院·科技学院",
      period: "2018.9 - 2022.6",
      description: "专注于Web开发技术和数据处理算法"
    }
  ]

  const certifications = [
    "全国大学生创新大赛三等奖",
    "多次研究生学业奖学金",
    "CET-4 英语四级证书",
    "武汉大学测绘遥感信息工程全国重点实验室"
  ]

  return (
    <div className="professional-skills-container section-padding">
      <div className="professional-skills-content">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* 标题 */}
          <div className="professional-skills-title">
            <h2 className="professional-skills-main-title">专业能力</h2>
            <p className="professional-skills-subtitle">
              扎实的技术基础，丰富的项目经验，持续学习的态度
            </p>
          </div>

          {/* 技能展示 */}
          <div className="professional-skills-section">
            <h3 className="professional-skills-section-title">技术栈</h3>
            <div className="skills-grid">
              {skills.map((skillGroup, groupIndex) => (
                <div 
                  key={skillGroup.category}
                  className={`skill-card ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${groupIndex * 200}ms` }}
                >
                  <div className="skill-card-header">
                    <div className="skill-card-icon">
                      {skillGroup.icon}
                    </div>
                    <h4 className="skill-card-title">
                      {skillGroup.category}
                    </h4>
                  </div>
                  <div className="skill-items">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-item-header">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percentage">{skill.level}%</span>
                        </div>
                        <div className="skill-progress-bg">
                          <div 
                            className="skill-progress-bar"
                            style={{ 
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDelay: `${(groupIndex * 200) + (skillIndex * 100)}ms`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 教育背景 */}
          <div className="professional-skills-section">
            <h3 className="professional-skills-section-title">教育背景</h3>
            <div className="education-section">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className={`education-card ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  <div className="education-content">
                    <div className="education-icon">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="education-details">
                      <div className="education-header">
                        <h4 className="education-degree">{edu.degree}</h4>
                        <span className="education-period">{edu.period}</span>
                      </div>
                      <p className="education-school">{edu.school}</p>
                      <p className="education-description">{edu.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 证书认证 */}
          <div>
            <h3 className="professional-skills-section-title">证书认证</h3>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className={`certification-card ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="certification-icon">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="certification-text">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalSkills
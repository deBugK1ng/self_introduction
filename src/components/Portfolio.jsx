import React, { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ExternalLink, Github, Eye, Calendar, Tag } from 'lucide-react'

const Portfolio = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const projects = [
    {
      id: 1,
      title: "某单位视频监控平台",
      category: "web",
      description: "基于Vue3、Axios、Django(DRF)、PostgreSQL等技术栈开发的视频监控平台，集成了视频监控设备管理、实时视频处理、事件检测等功能。",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      technologies: ["Vue.js", "Axios", "Django(DRF)", "PostgreSQL", "Redis", "Nginx"],
      liveUrl: "#",
      githubUrl: "#",
      date: "2024.12 至今"
    },
    {
      id: 2,
      title: "某单位数据监控平台",
      category: "web",
      description: "基于Vue3、Axios、Cesium.js、大数据API等技术开发的数据监控与分析平台，实现了数据可视化、实时监控、历史数据分析等功能。",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      technologies: ["Vue.js", "Axios", "Cesium.js", "大数据API", "XLSX文件处理", "Django(DRF)"],
      liveUrl: "#",
      githubUrl: "#",
      date: "2025.3 至今"
    },
    {
      id: 3,
      title: "湖北省气象监测管理与分析系统",
      category: "web",
      description: "基于Vue3、Axios、Cesium.js等技术开发的气象数据监测与分析平台，实现了气象数据采集、三维地图展示、数据分析等功能。",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
      technologies: ["Vue.js", "Axios", "Cesium.js", "大数据API", "XLS文件处理", "Django(DRF)"],
      liveUrl: "#",
      githubUrl: "#",
      date: "2025.3 至今"
    },
    {
      id: 4,
      title: "CVEO-某单位数据监控平台",
      category: "web",
      description: "武汉大学测绘遥感信息工程全国重点实验室项目，基于WebGIS与后台的数据合作监控平台，管理者可以通过这个平台查看、监控、实时地图、支持地图控制课程系统的运行状态。",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      technologies: ["Vue.js", "Axios", "Cesium.js", "Django(DRF)", "PostgreSQL", "Celery", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      date: "2024.7-2025.7"
    }
  ]

  const categories = [
    { id: 'all', name: '全部', count: projects.length },
    { id: 'web', name: 'Web应用', count: projects.filter(p => p.category === 'web').length },
    { id: 'gis', name: 'GIS系统', count: projects.filter(p => p.category === 'gis').length },
    { id: 'data', name: '数据平台', count: projects.filter(p => p.category === 'data').length }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="portfolio-container section-padding">
      <div className="portfolio-content">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* 标题 */}
          <div className="portfolio-title">
            <h2 className="portfolio-main-title">作品集</h2>
            <p className="portfolio-subtitle">
              精选项目展示，涵盖Web应用、移动应用、AI项目等多个领域
            </p>
          </div>

          {/* 分类筛选 */}
          <div className="portfolio-categories">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`portfolio-category-btn ${
                  selectedCategory === category.id ? 'active' : 'inactive'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* 项目网格 */}
          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`portfolio-card ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* 项目图片 */}
                <div className="portfolio-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="portfolio-image"
                  />
                  <div className="portfolio-image-overlay">
                    <div className="portfolio-image-actions">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-action-btn"
                      >
                        <Eye size={20} />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-action-btn"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-action-btn"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 项目信息 */}
                <div className="portfolio-card-content">
                  <div className="portfolio-card-header">
                    <h3 className="portfolio-card-title">
                      {project.title}
                    </h3>
                    <div className="portfolio-card-date">
                      <Calendar size={14} />
                      {project.date}
                    </div>
                  </div>
                  
                  <p className="portfolio-card-description">
                    {project.description}
                  </p>

                  {/* 技术标签 */}
                  <div className="portfolio-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="portfolio-tech-tag"
                      >
                        <Tag size={12} />
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 项目链接 */}
                  <div className="portfolio-card-links">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-link primary"
                    >
                      在线预览
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-link secondary"
                    >
                      查看代码
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 更多项目提示 */}
          <div className={`portfolio-more ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <p className="portfolio-more-text">想了解更多项目？</p>
            <a
              href="https://github.com/zhangsan"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-more-link"
            >
              <Github size={20} />
              访问我的GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
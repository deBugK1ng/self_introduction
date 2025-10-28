import React, { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ExternalLink, Github, Eye, Calendar, Tag } from 'lucide-react'
import { useImagePreloader } from '../hooks/useImagePreloader'
import ProjectModal from './ProjectModal'

// 项目图片映射
const projectImages = {
  "某单位智慧高速巡检实景三维平台": [
    "/media/img/交投login.png",
    "/media/img/交投hbmap.png",
    "/media/img/交投3d1.png",
    "/media/img/交投model1.png",
    "/media/img/交投model2.png",
    "/media/img/交投model3.jpg",
    "/media/img/交投monitor.jpg",
    "/media/img/交投video1.png",
    "/media/img/交投video2.jpg",
    "/media/img/交投量算1.png",
    "/media/img/交投量算2.png"
  ],
  "某单位边坡预警监测平台": [
    "/media/img/边坡login.png",
    "/media/img/边坡data.png",
    "/media/img/边坡OSS - 1.png",
    "/media/img/边坡OSS - 2.png",
    "/media/img/边坡video.png",
    "/media/img/边坡video-play.png",
    "/media/img/边坡warning.png"
  ],
  "湖北省气象监测管理与分析系统": [
    "/media/img/气象login.png",
    "/media/img/气象dashboard.png",
    "/media/img/气象coverage.png",
    "/media/img/气象history - 1.png",
    "/media/img/气象history - 2.png"
  ]
};

// 项目数据
const projects = [
  {
    id: 1,
    title: "某单位智慧高速巡检实景三维平台",
    category: "web",
    description: "基于Vue3、Axios、Django(DRF)、PostgreSQL等技术栈开发的视频监控平台，集成了视频监控设备管理、实时视频处理、事件检测等功能。",
    image: "/media/img/交投hbmap.png",
    technologies: ["Vue.js", "Axios", "Django(DRF)", "PostgreSQL", "Redis", "Nginx"],
    liveUrl: "#",
    githubUrl: "#",
    date: "2024.12 至今"
  },
  {
    id: 2,
    title: "某单位边坡预警监测平台",
    category: "web",
    description: "基于Vue3、Axios、Cesium.js、大数据API等技术开发的数据监控与分析平台，实现了数据可视化、实时监控、历史数据分析等功能。",
    image: "/media/img/边坡data.png",
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
    image: "/media/img/气象dashboard.png",
    technologies: ["Vue.js", "Axios", "Cesium.js", "大数据API", "XLS文件处理", "Django(DRF)"],
    liveUrl: "https://elxcmsbaviwe.sealoshzh.site/",
    githubUrl: "#",
    date: "2025.3 至今"
  },
];

const Portfolio = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // 获取所有项目图片用于预加载
  const allProjectImages = React.useMemo(() => {
    const allImages = [];
    Object.values(projectImages).forEach(images => {
      allImages.push(...images);
    });
    // 添加项目封面图片
    projects.forEach(project => {
      if (project.image && !allImages.includes(project.image)) {
        allImages.push(project.image);
      }
    });
    return allImages;
  }, []);

  // 预加载所有图片
  const { isLoading: imagesPreloading, loadingProgress } = useImagePreloader(allProjectImages);

  const handlePreviewClick = (project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="portfolio-container section-padding">
      <div className="portfolio-content">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* 标题 */}
          <div className="portfolio-title">
            <h2 className="portfolio-main-title">作品集</h2>
            <p className="portfolio-subtitle">
              精选项目展示
              {imagesPreloading && (
                <span className="text-sm text-gray-500 ml-2">
                  (图片预加载中... {Math.round(loadingProgress)}%)
                </span>
              )}
            </p>
          </div>

          {/* 项目网格 */}
          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`portfolio-card ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                      <button
                        onClick={() => handlePreviewClick(project)}
                        className="portfolio-action-btn"
                        disabled={imagesPreloading}
                        title={imagesPreloading ? '图片预加载中，请稍候...' : '预览项目'}
                      >
                        <Eye size={20} />
                      </button>
                      {project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-action-btn"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 项目预览弹窗 */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={closeModal}
        project={selectedProject}
        images={selectedProject ? projectImages[selectedProject.title] || [] : []}
      />
    </div>
  )
}

export default Portfolio
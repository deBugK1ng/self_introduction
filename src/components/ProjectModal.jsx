import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, project, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>

        <div className="carousel-container">
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" onClick={prevImage}>
              <ChevronLeft size={24} />
            </button>
            
            <div className="carousel-images">
              <img
                src={images[currentImageIndex]}
                alt={`${project.title} - ${currentImageIndex + 1}`}
                className="carousel-image"
              />
            </div>
            
            <button className="carousel-btn next" onClick={nextImage}>
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <div className="project-tags">
            {project.tags?.map((tag, index) => (
              <span key={index} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
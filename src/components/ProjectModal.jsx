import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useImagePreloader, useImageLoader } from '../hooks/useImagePreloader';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, project, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageTransitioning, setImageTransitioning] = useState(false);
  
  // 预加载所有图片
  const { loadedImages, isLoading: preloading, loadingProgress } = useImagePreloader(images);
  
  // 当前图片的加载状态
  const { isLoaded: currentImageLoaded, isLoading: currentImageLoading } = useImageLoader(
    images[currentImageIndex]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0); // 重置到第一张图片
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = () => {
    if (imageTransitioning) return;
    
    setImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setImageTransitioning(false);
    }, 150);
  };

  const prevImage = () => {
    if (imageTransitioning) return;
    
    setImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setImageTransitioning(false);
    }, 150);
  };

  const goToImage = (index) => {
    if (imageTransitioning || index === currentImageIndex) return;
    
    setImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setImageTransitioning(false);
    }, 150);
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

        {/* 预加载进度条 */}
        {preloading && (
          <div className="preload-progress">
            <div className="preload-progress-bar">
              <div 
                className="preload-progress-fill" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="preload-progress-text">
              加载图片中... {Math.round(loadingProgress)}%
            </span>
          </div>
        )}

        <div className="carousel-container">
          <div className="carousel-wrapper">
            <button 
              className="carousel-btn prev" 
              onClick={prevImage}
              disabled={imageTransitioning || preloading}
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="carousel-images">
              {/* 图片加载指示器 */}
              {(currentImageLoading || imageTransitioning) && (
                <div className="image-loading-overlay">
                  <Loader2 size={32} className="loading-spinner" />
                </div>
              )}
              
              <img
                src={images[currentImageIndex]}
                alt={`${project.title} - ${currentImageIndex + 1}`}
                className={`carousel-image ${
                  currentImageLoaded && !imageTransitioning ? 'loaded' : 'loading'
                }`}
                style={{
                  opacity: currentImageLoaded && !imageTransitioning ? 1 : 0.3,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              />
            </div>
            
            <button 
              className="carousel-btn next" 
              onClick={nextImage}
              disabled={imageTransitioning || preloading}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''} ${
                  loadedImages[images[index]] ? 'loaded' : 'loading'
                }`}
                onClick={() => goToImage(index)}
                disabled={imageTransitioning}
                title={loadedImages[images[index]] ? '已加载' : '加载中...'}
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
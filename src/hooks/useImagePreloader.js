import { useState, useEffect } from 'react';

/**
 * 图片预加载Hook
 * @param {Array} imageUrls - 需要预加载的图片URL数组
 * @returns {Object} - 返回加载状态和预加载的图片对象
 */
export const useImagePreloader = (imageUrls) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadedCount(0);
    setLoadingProgress(0);
    
    const imagePromises = imageUrls.map((url, index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          setLoadedImages(prev => ({
            ...prev,
            [url]: img
          }));
          
          setLoadedCount(prevCount => {
            const newCount = prevCount + 1;
            const progress = (newCount / imageUrls.length) * 100;
            setLoadingProgress(progress);
            return newCount;
          });
          
          resolve({ url, img, index });
        };
        
        img.onerror = () => {
          console.warn(`Failed to load image: ${url}`);
          setLoadedCount(prevCount => {
            const newCount = prevCount + 1;
            const progress = (newCount / imageUrls.length) * 100;
            setLoadingProgress(progress);
            return newCount;
          });
          resolve({ url, img: null, index });
        };
        
        img.src = url;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
    });

  }, [imageUrls]);

  return {
    loadedImages,
    isLoading,
    loadingProgress,
    loadedCount,
    totalCount: imageUrls ? imageUrls.length : 0
  };
};

/**
 * 单个图片加载Hook
 * @param {string} imageUrl - 图片URL
 * @returns {Object} - 返回图片加载状态
 */
export const useImageLoader = (imageUrl) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageUrl) return;

    setIsLoading(true);
    setIsLoaded(false);
    setError(null);

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setError('Failed to load image');
      setIsLoading(false);
    };
    
    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return { isLoaded, isLoading, error };
};
import React, { useEffect, useState, useRef } from 'react';

// 共享粒子池管理器
class SharedParticleManager {
  constructor() {
    if (SharedParticleManager.instance) {
      return SharedParticleManager.instance;
    }
    
    this.particles = [];
    this.particleIdCounter = 0;
    this.maxParticles = 50; // 最大粒子数量
    this.isInitialized = false;
    this.lastUpdateTime = performance.now();
    SharedParticleManager.instance = this;
  }

  // 创建无特效的基础粒子
  createBaseParticle() {
    const particle = {
      id: `particle-${this.particleIdCounter++}-${Date.now()}`,
      x: Math.random() * 100,
      y: Math.random() * 120 - 20, // 分布在整个屏幕高度
      size: Math.random() * 10 + 8,
      baseOpacity: Math.random() * 0.4 + 0.2, // 基础透明度
      opacity: Math.random() * 0.4 + 0.2,
      animationDelay: Math.random() * 2,
      animationDuration: Math.random() * 10 + 8,
      drift: Math.random() * 40 - 20,
      createdAt: Date.now(),
      // 运动状态 - 增加速度变化
      velocityY: Math.random() * 0.8 + 0.3, // 增加下降速度范围
      velocityX: (Math.random() - 0.5) * 0.4, // 增加水平漂移
      // 添加旋转和缩放动画
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      scale: 0.8 + Math.random() * 0.4,
      scaleSpeed: (Math.random() - 0.5) * 0.01,
    };
    
    return particle;
  }

  // 初始化粒子池
  initializeParticlePool(count = 40) {
    if (this.isInitialized) return this.particles;
    
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createBaseParticle());
    }
    
    this.isInitialized = true;
    return [...this.particles];
  }

  // 使用requestAnimationFrame优化的更新方法
  updateParticlePositions() {
    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - this.lastUpdateTime) / 16.67, 2); // 限制deltaTime防止跳跃
    this.lastUpdateTime = currentTime;
    
    this.particles = this.particles.map(particle => {
      // 基于时间差的平滑位置更新
      particle.y += particle.velocityY * deltaTime;
      particle.x += particle.velocityX * deltaTime;
      
      // 添加旋转动画
      particle.rotation += particle.rotationSpeed * deltaTime;
      particle.rotation = particle.rotation % 360; // 防止角度值过大
      
      // 更安全的缩放动画
      particle.scale += particle.scaleSpeed * deltaTime;
      
      // 严格限制缩放范围，防止粒子变得过大或过小
      if (particle.scale <= 0.6) {
        particle.scale = 0.6;
        particle.scaleSpeed = Math.abs(particle.scaleSpeed); // 确保向上缩放
      } else if (particle.scale >= 1.2) {
        particle.scale = 1.2;
        particle.scaleSpeed = -Math.abs(particle.scaleSpeed); // 确保向下缩放
      }
      
      // 边界检查和重置
      if (particle.y > 110) {
        // 粒子到达底部，重新从顶部开始
        particle.y = -10;
        particle.x = Math.random() * 100;
        // 重新随机化运动参数
        particle.velocityY = Math.random() * 0.8 + 0.3;
        particle.velocityX = (Math.random() - 0.5) * 0.4;
        particle.rotationSpeed = (Math.random() - 0.5) * 2;
        // 重置缩放参数
        particle.scale = 0.8 + Math.random() * 0.4;
        particle.scaleSpeed = (Math.random() - 0.5) * 0.01;
      }
      
      // 水平边界检查
      if (particle.x < -5) {
        particle.x = 105;
      } else if (particle.x > 105) {
        particle.x = -5;
      }
      
      return particle;
    });
    
    return [...this.particles];
  }

  // 获取所有粒子（用于渲染）
  getAllParticles() {
    return [...this.particles];
  }

  // 重置粒子透明度（用于特效切换时的平滑过渡）
  resetParticleOpacity() {
    this.particles = this.particles.map(particle => ({
      ...particle,
      opacity: particle.baseOpacity
    }));
    return [...this.particles];
  }
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);
  const [currentSeason, setCurrentSeason] = useState('spring');
  const particleManagerRef = useRef(null);

  // 四季主题配置
  const seasons = {
    spring: { name: '春天', type: 'leaf', color: 'spring' },
    summer: { name: '夏天', type: 'sakura', color: 'summer' },
    autumn: { name: '秋天', type: 'autumn-leaf', color: 'autumn' },
    winter: { name: '冬天', type: 'snow', color: 'winter' }
  };

  const seasonOrder = ['spring', 'summer', 'autumn', 'winter'];

  // 初始化共享粒子池
  useEffect(() => {
    if (!particleManagerRef.current) {
      particleManagerRef.current = new SharedParticleManager();
      
      // 初始化粒子池
      const initialParticles = particleManagerRef.current.initializeParticlePool(40);
      setParticles(initialParticles);
    }
  }, []);

  // 季节切换定时器
  useEffect(() => {
    const seasonInterval = setInterval(() => {
      setCurrentSeason(prevSeason => {
        const currentIndex = seasonOrder.indexOf(prevSeason);
        const nextIndex = (currentIndex + 1) % seasonOrder.length;
        return seasonOrder[nextIndex];
      });
    }, 10000); // 改为60秒切换一次，便于测试

    return () => clearInterval(seasonInterval);
  }, []);

  // 处理季节切换 - 只重置透明度，不创建新粒子
  useEffect(() => {
    if (particleManagerRef.current) {
      // 重置粒子透明度，为新特效做准备
      const updatedParticles = particleManagerRef.current.resetParticleOpacity();
      setParticles(updatedParticles);
    }
  }, [currentSeason]);

  // 定期更新粒子位置 - 使用requestAnimationFrame优化
  useEffect(() => {
    let animationId;
    let isActive = true;
    
    const updateParticles = () => {
      if (!isActive) return;
      
      if (particleManagerRef.current) {
        try {
          const updatedParticles = particleManagerRef.current.updateParticlePositions();
          setParticles(updatedParticles);
        } catch (error) {
          console.warn('粒子更新错误:', error);
          // 发生错误时暂停一帧，防止连续错误
          setTimeout(() => {
            if (isActive) {
              animationId = requestAnimationFrame(updateParticles);
            }
          }, 16);
          return;
        }
      }
      
      if (isActive) {
        animationId = requestAnimationFrame(updateParticles);
      }
    };
    
    // 启动动画循环
    animationId = requestAnimationFrame(updateParticles);

    return () => {
      isActive = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // 根据当前季节渲染粒子特效
  const renderParticleWithSeasonEffect = (particle) => {
    const currentSeasonConfig = seasons[currentSeason];
    switch (currentSeasonConfig.type) {
      case 'leaf': // 春天绿叶
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 15.5C2 15.5 2 16.5 3 16.5S4 15.5 4 15.5C4 15.5 4 14.5 5 14.5S6 15.5 6 15.5C6 15.5 6 14.5 7 14.5S8 15.5 8 15.5C8 15.5 8 14.5 9 14.5S10 15.5 10 15.5C10 15.5 10 14.5 11 14.5S12 15.5 12 15.5C12 15.5 12 14.5 13 14.5S14 15.5 14 15.5C14 15.5 14 14.5 15 14.5S16 15.5 16 15.5C16 15.5 16 14.5 17 14.5S18 15.5 18 15.5" />
            <path d="M12 2C12 2 15 4 17 8C15 6 12 6 12 6C12 6 9 6 7 8C9 4 12 2 12 2Z" />
          </svg>
        );
      
      case 'sakura': // 夏天樱花花瓣
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            {/* 樱花花瓣形状 - 椭圆形带有顶部凹陷 */}
            <path d="M12 2C8 2 5 6 5 12C5 18 8 22 12 22C16 22 19 18 19 12C19 6 16 2 12 2Z" 
                  fill="url(#sakuraGradient)" />
            {/* 花瓣顶部的心形凹陷 */}
            <path d="M12 2C10 4 8 6 12 8C16 6 14 4 12 2Z" 
                  fill="url(#sakuraGradient)" opacity="0.8" />
            {/* 渐变定义 */}
            <defs>
              <radialGradient id="sakuraGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffb3d9" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ff80cc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff4db3" stopOpacity="0.7" />
              </radialGradient>
            </defs>
          </svg>
        );
      
      case 'autumn-leaf': // 秋天枯叶
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            {/* 叶子主体形状 - 椭圆形叶片 */}
            <path d="M12 3C8 3 5 6 5 12C5 16 7 19 10 20.5L12 21L14 20.5C17 19 19 16 19 12C19 6 16 3 12 3Z" 
                  fill="url(#autumnGradient)" />
            {/* 叶子中央叶脉 */}
            <path d="M12 3L12 21" 
                  stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.8" />
            {/* 左侧叶脉 */}
            <path d="M12 6C10 8 8 10 9 12C10 14 11 16 12 18" 
                  stroke="#8B4513" strokeWidth="0.5" fill="none" opacity="0.6" />
            {/* 右侧叶脉 */}
            <path d="M12 6C14 8 16 10 15 12C14 14 13 16 12 18" 
                  stroke="#8B4513" strokeWidth="0.5" fill="none" opacity="0.6" />
            {/* 叶柄 */}
            <path d="M12 21L12 23" 
                  stroke="#8B4513" strokeWidth="1.2" strokeLinecap="round" />
            {/* 渐变定义 */}
            <defs>
              <linearGradient id="autumnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#FFA500" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#FF8C00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#CD853F" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        );
      
      case 'snow': // 冬天雪花
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
              <path d="M12 2L12 22M2 12L22 12M6.34 6.34L17.66 17.66M17.66 6.34L6.34 17.66" />
              <path d="M12 5L10.5 3.5M12 5L13.5 3.5M12 19L10.5 20.5M12 19L13.5 20.5" />
              <path d="M5 12L3.5 10.5M5 12L3.5 13.5M19 12L20.5 10.5M19 12L20.5 13.5" />
              <path d="M8.5 8.5L7 7M8.5 8.5L7 10M15.5 15.5L17 17M15.5 15.5L17 14" />
              <path d="M15.5 8.5L17 7M15.5 8.5L17 10M8.5 15.5L7 17M8.5 15.5L7 14" />
            </g>
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${seasons[currentSeason].type} ${seasons[currentSeason].color}`}
          style={{
            left: `${Math.max(0, Math.min(100, particle.x))}%`, // 确保位置在有效范围内
            top: `${Math.max(-10, Math.min(110, particle.y))}%`,
            width: `${Math.max(4, Math.min(20, particle.size))}px`, // 限制尺寸范围
            height: `${Math.max(4, Math.min(20, particle.size))}px`,
            opacity: Math.max(0, Math.min(1, particle.opacity)), // 确保透明度在有效范围
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
            transform: `rotate(${particle.rotation % 360}deg) scale(${Math.max(0.3, Math.min(1.5, particle.scale))})`, // 严格限制变换值
            transition: 'none',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden', // 防止3D变换闪烁
            transformStyle: 'preserve-3d', // 优化3D渲染
          }}
        >
          {renderParticleWithSeasonEffect(particle)}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
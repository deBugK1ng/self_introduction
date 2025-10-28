import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Heart } from 'lucide-react'

const LifeModule = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)

  const lifePhotos = [
    {
      id: 1,
      image: '/media/img/生活-爬山.jpg',
      title: '爱冒险'
    },
    {
      id: 2,
      image: '/media/img/生活-滑雪2.jpg',
      title: '爱运动'
    },
    {
      id: 3,
      image: '/media/img/生活-滑雪1.jpg',
      title: '爱挑战'
    },
    {
      id: 4,
      image: '/media/img/生活-练琴.jpg',
      title: '爱音乐'
    }
  ]

  return (
    <div className="life-module-container">
      <div className="container-max-width section-padding">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* 标题部分 */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Heart className="text-pink-500 mr-3" size={32} />
              <h2 className="text-4xl font-bold text-gray-800">work-life balance</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              工作之余，我热爱探索生活的多彩面貌，在不同的体验中寻找灵感与快乐
            </p>
          </div>

          {/* 生活卡片网格 - 类似技能卡片的大卡片设计 */}
          <div className="life-cards-grid">
            {lifePhotos.map((photo, index) => {
              return (
                <div
                  key={photo.id}
                  className={`life-card ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="life-card-image-container">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="life-card-image"
                    />
                    <div className="life-card-overlay">
                      <div className="life-card-overlay-content">
                        <h3 className="life-card-title">{photo.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="life-card-content">
                    <div className="life-card-header">
                      <div className="life-card-icon">
                        <Heart className="w-6 h-6" />
                      </div>
                      <h4 className="life-card-name">
                        {photo.title}
                      </h4>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LifeModule
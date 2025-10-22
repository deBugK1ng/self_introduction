import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Heart, Mountain, Snowflake, Music } from 'lucide-react'

const LifeModule = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)

  const lifePhotos = [
    {
      id: 1,
      image: '/assests/img/生活-爬山.jpg',
      title: '登山探险',
      description: '征服高峰，挑战自我，在山巅感受生命的壮阔',
      icon: Mountain
    },
    {
      id: 2,
      image: '/assests/img/生活-滑雪2.jpg',
      title: '雪场飞驰',
      description: '在雪花纷飞中感受速度与激情的完美结合',
      icon: Snowflake
    },
    {
      id: 3,
      image: '/assests/img/生活-滑雪1.jpg',
      title: '冰雪世界',
      description: '拥抱冬日的纯净，享受滑雪带来的自由与快乐',
      icon: Snowflake
    },
    {
      id: 4,
      image: '/assests/img/生活-练琴.jpg',
      title: '音乐时光',
      description: '在琴键上寻找内心的宁静，用音符诠释生活的美好',
      icon: Music
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

          {/* 照片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lifePhotos.map((photo, index) => {
              const IconComponent = photo.icon
              return (
                <div
                  key={photo.id}
                  className={`life-photo-card transition-all duration-1000 delay-${index * 200} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center mb-2">
                          <IconComponent size={20} className="mr-2" />
                          <h3 className="text-lg font-semibold">{photo.title}</h3>
                        </div>
                        <p className="text-sm text-gray-200">{photo.description}</p>
                      </div>
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
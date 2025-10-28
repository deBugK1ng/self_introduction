import React, { useEffect, useState, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Mail, Phone, MapPin, Download } from 'lucide-react'

const PersonalInfo = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const [isAvatarFixed, setIsAvatarFixed] = useState(false)
  const avatarRef = useRef(null)
  const sectionRef = useRef(null)

  // 滚动监听逻辑 - 检测头像是否需要固定定位
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && avatarRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect()
        const avatarRect = avatarRef.current.getBoundingClientRect()
        
        // 当PersonalInfo section的底部滚动到视窗顶部时，固定头像
        const shouldFixAvatar = sectionRect.bottom <= 0
        
        setIsAvatarFixed(shouldFixAvatar)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 眼睛跟随鼠标移动的逻辑
  useEffect(() => {
    const handleMouseMove = (event) => {
      const eyeballs = document.querySelectorAll('.eyeball')
      eyeballs.forEach((eyeball) => {
        const eyeContainer = eyeball.closest('.eye-container')
        const rect = eyeContainer.getBoundingClientRect()
        const eyeCenterX = rect.left + rect.width / 2
        const eyeCenterY = rect.top + rect.height / 2
        
        const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX)
        const distance = Math.min(rect.width / 6, rect.height / 6) // 限制移动距离
        
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        
        eyeball.style.transform = `translate(${x}px, ${y}px)`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const personalData = {
    name: "叶子凡",
    title: "Web前端开发工程师",
    education: "测绘工程硕士 · 地理信息系统方向",
    location: "武汉市",
    email: "254588201@qq.com",
    phone: "13437166500"
  }

  return (
    <>
      {/* 固定在右上角的头像 */}
      {isAvatarFixed && (
        <div 
          className="fixed z-50 transition-all duration-500 ease-in-out transform"
          style={{
            top: 'calc(1rem + 30px)',
            left: 'calc(1rem + 50px)',
            animation: isAvatarFixed ? 'slideInFromRight 0.5s ease-out' : 'slideOutToRight 0.5s ease-in'
          }}
        >
          <div className="face w-32 h-32 rounded-full border-4 border-white/30 relative" style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#FFC107',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.3),
              0 4px 16px rgba(0, 0, 0, 0.2),
              inset 0 2px 8px rgba(255, 255, 255, 0.3),
              inset 0 -2px 8px rgba(0, 0, 0, 0.1)
            `,
            transform: 'perspective(200px) rotateX(5deg)',
            animation: 'faceFloat 4s ease-in-out infinite',
            transformStyle: 'preserve-3d'
          }}>
            {/* 眼睛容器 - 原始大小 */}
            <div className="eyes" style={{display: 'flex', gap: '20px', marginBottom: '16px'}}>
              {/* 左眼 */}
              <div className="eye-container" style={{
                width: '40px', 
                height: '40px', 
                backgroundColor: 'white', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative',
                boxShadow: `
                  0 3px 8px rgba(0, 0, 0, 0.2),
                  inset 0 2px 4px rgba(255, 255, 255, 0.8),
                  inset 0 -2px 4px rgba(0, 0, 0, 0.1)
                `,
                transform: 'translateZ(2px)'
              }}>
                <div className="eyeball" style={{
                  width: '18px', 
                  height: '18px', 
                  backgroundColor: 'black', 
                  borderRadius: '50%', 
                  transition: 'transform 0.1s ease-out',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  transform: 'translateZ(4px)'
                }}></div>
              </div>
              {/* 右眼 */}
              <div className="eye-container" style={{
                width: '40px', 
                height: '40px', 
                backgroundColor: 'white', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                position: 'relative',
                boxShadow: `
                  0 3px 8px rgba(0, 0, 0, 0.2),
                  inset 0 2px 4px rgba(255, 255, 255, 0.8),
                  inset 0 -2px 4px rgba(0, 0, 0, 0.1)
                `,
                transform: 'translateZ(2px)'
              }}>
                <div className="eyeball" style={{
                  width: '18px', 
                  height: '18px', 
                  backgroundColor: 'black', 
                  borderRadius: '50%', 
                  transition: 'transform 0.1s ease-out',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  transform: 'translateZ(4px)'
                }}></div>
              </div>
            </div>
            {/* 嘴巴 - 原始大小 */}
            <div 
              className="mouth" 
              style={{
                width: '50px', 
                height: '25px', 
                backgroundColor: '#B8860B', 
                borderBottomLeftRadius: '25px', 
                borderBottomRightRadius: '25px',
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                animation: 'mouthMorph 0.7s ease-in-out infinite alternate',
                transformOrigin: 'center top'
              }}
            ></div>
          </div>
        </div>
      )}

      {/* 原始PersonalInfo section */}
      <div ref={sectionRef} className="gradient-bg min-h-screen flex items-center justify-center section-padding">
      <div 
        ref={ref}
        className={`container-max-width transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center text-white">
          {/* 头像 */}
          <div 
            ref={avatarRef}
            className={`mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="face w-32 h-32 mx-auto rounded-full border-4 border-white/30 relative" style={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: '#FFC107',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.3),
                0 4px 16px rgba(0, 0, 0, 0.2),
                inset 0 2px 8px rgba(255, 255, 255, 0.3),
                inset 0 -2px 8px rgba(0, 0, 0, 0.1)
              `,
              transform: 'perspective(200px) rotateX(5deg)',
              animation: 'faceFloat 4s ease-in-out infinite',
              transformStyle: 'preserve-3d'
            }}>
              {/* 眼睛容器 */}
              <div className="eyes" style={{display: 'flex', gap: '16px', marginBottom: '12px'}}>
                {/* 左眼 */}
                <div className="eye-container" style={{
                  width: '32px', 
                  height: '32px', 
                  backgroundColor: 'white', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  position: 'relative',
                  boxShadow: `
                    0 4px 8px rgba(0, 0, 0, 0.2),
                    inset 0 2px 4px rgba(255, 255, 255, 0.8),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.1)
                  `,
                  transform: 'translateZ(4px)'
                }}>
                  <div className="eyeball" style={{
                    width: '14px', 
                    height: '14px', 
                    backgroundColor: 'black', 
                    borderRadius: '50%', 
                    transition: 'transform 0.1s ease-out',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(2px)'
                  }}></div>
                </div>
                {/* 右眼 */}
                <div className="eye-container" style={{
                  width: '32px', 
                  height: '32px', 
                  backgroundColor: 'white', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  position: 'relative',
                  boxShadow: `
                    0 4px 8px rgba(0, 0, 0, 0.2),
                    inset 0 2px 4px rgba(255, 255, 255, 0.8),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.1)
                  `,
                  transform: 'translateZ(4px)'
                }}>
                  <div className="eyeball" style={{
                    width: '14px', 
                    height: '14px', 
                    backgroundColor: 'black', 
                    borderRadius: '50%', 
                    transition: 'transform 0.1s ease-out',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'translateZ(2px)'
                  }}></div>
                </div>
              </div>
              {/* 嘴巴 */}
              <div 
                className="mouth" 
                style={{
                  width: '40px', 
                  height: '20px', 
                  backgroundColor: '#B8860B', 
                  borderBottomLeftRadius: '20px', 
                  borderBottomRightRadius: '20px',
                  borderTopLeftRadius: '0px',
                  borderTopRightRadius: '0px',
                  animation: 'mouthMorph 0.7s ease-in-out infinite alternate',
                  transformOrigin: 'center top'
                }}
              ></div>
            </div>
          </div>

          {/* 基本信息 */}
          <div className={`mb-8 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h1 className="text-5xl font-bold mb-4">{personalData.name}</h1>
            <h2 className="text-2xl font-light mb-2 text-blue-100">{personalData.title}</h2>
            <p className="text-lg text-blue-100 mb-6">{personalData.education}</p>
          </div>

          {/* 联系方式 */}
          <div className={`mb-8 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin size={18} />
                <span>{personalData.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Mail size={18} />
                <span>{personalData.email}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Phone size={18} />
                <span>{personalData.phone}</span>
              </div>
            </div>
          </div>

          {/* 社交链接和简历下载 */}
          <div className={`flex justify-center gap-4 transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>


            <button 
              onClick={() => window.open('/media/个人简历 - yzf08.pdf', '_blank')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-full text-white hover:scale-105 flex items-center gap-2"
            >
              <Download size={20} />
              <span>查看简历</span>
            </button>
          </div>

          {/* 滚动提示 */}
          <div className={`mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
              </div>
              <p className="text-white/70 text-sm mt-2">向下滚动查看更多</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default PersonalInfo
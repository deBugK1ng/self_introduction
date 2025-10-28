import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Mail, Phone, MapPin, Download } from 'lucide-react'

const PersonalInfo = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)

  const personalData = {
    name: "叶子凡",
    title: "Web前端开发工程师",
    education: "测绘工程硕士 · 地理信息系统方向",
    location: "武汉市",
    email: "254588201@qq.com",
    phone: "13437166500"
  }

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center section-padding">
      <div 
        ref={ref}
        className={`container-max-width transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center text-white">
          {/* 头像 */}
          <div className={`mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
              叶
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
  )
}

export default PersonalInfo
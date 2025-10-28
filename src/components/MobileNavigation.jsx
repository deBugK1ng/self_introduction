import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Camera, ArrowUp } from 'lucide-react';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const navigationItems = [
    { id: 'personal', label: '个人信息', icon: Home },
    { id: 'skills', label: '专业技能', icon: User },
    { id: 'portfolio', label: '作品集', icon: Briefcase },
    { id: 'life', label: '生活照片', icon: Camera }
  ];

  // 监听滚动位置，自动更新活跃导航项和回到顶部按钮显示
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      // 更新活跃导航项
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }

      // 控制回到顶部按钮显示（滚动超过300px时显示）
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* 移动端汉堡菜单按钮 */}
      <button
        className="mobile-nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="切换导航菜单"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 移动端导航菜单 */}
      <nav className={`mobile-nav ${isOpen ? 'mobile-nav-open' : ''}`}>
        <div className="mobile-nav-overlay" onClick={() => setIsOpen(false)} />
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <h3>导航菜单</h3>
            <button
              className="mobile-nav-close"
              onClick={() => setIsOpen(false)}
              aria-label="关闭导航菜单"
            >
              <X size={20} />
            </button>
          </div>
          <ul className="mobile-nav-list">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} className="mobile-nav-item">
                  <button
                    className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <IconComponent className="mobile-nav-icon" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 桌面端固定导航 */}
      <nav className="desktop-nav">
        <ul className="desktop-nav-list">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id} className="desktop-nav-item">
                <button
                  className={`desktop-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  title={item.label}
                >
                  <IconComponent className="desktop-nav-icon" />
                </button>
              </li>
            );
          })}
          
          {/* 回到顶部按钮 */}
          {showScrollToTop && (
            <li className="desktop-nav-item">
              <button
                className="desktop-nav-link scroll-to-top"
                onClick={scrollToTop}
                title="回到顶部"
              >
                <ArrowUp className="desktop-nav-icon" />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default MobileNavigation;
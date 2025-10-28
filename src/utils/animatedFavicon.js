class AnimatedFavicon {
  constructor() {
    this.frames = [
      '/favicon-frames/frame1.svg',
      '/favicon-frames/frame2.svg', 
      '/favicon-frames/frame3.svg',
      '/favicon-frames/frame4.svg',
      '/favicon-frames/frame5.svg',
      '/favicon-frames/frame6.svg',
      '/favicon-frames/frame7.svg',
      '/favicon-frames/frame8.svg',
      '/favicon-frames/frame9.svg',
      '/favicon-frames/frame10.svg',
      '/favicon-frames/frame11.svg',
      '/favicon-frames/frame12.svg'
    ];
    this.currentFrame = 0;
    this.intervalId = null;
    this.isAnimating = false;
  }

  updateFavicon(href) {
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(link => link.remove());

    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = href;
    document.head.appendChild(link);
  }

  start(interval = 800) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.intervalId = setInterval(() => {
      this.updateFavicon(this.frames[this.currentFrame]);
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isAnimating = false;
    }
  }

  setStaticFavicon(href = '/favicon.gif') {
    this.stop();
    this.updateFavicon(href);
  }
}

export default AnimatedFavicon;
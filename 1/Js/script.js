// 高级动画和视差效果
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // 初始化所有动画
  initAnimations();
  initParticles();
  initParallax();
  initSkillsAnimation();
});

function initAnimations() {
  // 章节标题动画
  gsap.utils.toArray(".section-header").forEach((header) => {
    gsap.to(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  });

  // 关于我区域动画
  gsap.to(".about-text", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      end: "bottom 30%",
      toggleActions: "play none none reverse",
    },
    opacity: 1,
    x: 0,
    duration: 1.5,
    ease: "power3.out",
  });

  // 3D头像卡片视差
  gsap.to(".avatar-card", {
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    y: -100,
    rotationY: 5,
    ease: "none",
  });

  // 项目卡片交错动画
  gsap.utils.toArray(".project-card").forEach((card, index) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: index * 0.2,
      ease: "power3.out",
    });
  });

  // 技能条动画
  gsap.utils.toArray(".skill-level").forEach((bar) => {
    const level = bar.getAttribute("data-level");
    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      width: level + "%",
      duration: 1.5,
      ease: "power3.out",
    });
  });

  // 数字计数动画
  gsap.utils.toArray(".stat-number").forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-count"));
    gsap.to(stat, {
      scrollTrigger: {
        trigger: stat,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      innerHTML: target,
      duration: 2,
      ease: "power3.out",
      snap: { innerHTML: 1 },
      onUpdate: function () {
        stat.innerHTML = Math.floor(this.targets()[0].innerHTML);
      },
    });
  });
}

function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];

  // 设置画布尺寸
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // 粒子类
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.decay = Math.random() * 0.005 + 0.002;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;

      if (this.alpha <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 245, 245, ${this.alpha})`;
      ctx.fill();
    }
  }

  // 初始化粒子
  function initParticles() {
    particles = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  // 窗口调整
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });

  // 启动
  resizeCanvas();
  initParticles();
  animate();
}

function initParallax() {
  // 几何形状视差
  gsap.utils.toArray(".shape").forEach((shape) => {
    const depth = parseFloat(shape.getAttribute("data-depth")) || 0.1;

    gsap.to(shape, {
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      y: (i, target) => scrollY * depth,
      ease: "none",
    });
  });

  // 文字视差效果
  gsap.utils.toArray(".text-reveal-container").forEach((container) => {
    gsap.to(container, {
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 1,
      },
      y: -50,
      opacity: 1,
      ease: "power3.out",
    });
  });
}

function initSkillsAnimation() {
  // 3D技能球体动画
  const sphereItems = document.querySelectorAll(".sphere-item");
  const radius = 150;

  sphereItems.forEach((item, index) => {
    const angle = (index / sphereItems.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = Math.sin(angle * 2) * radius;

    gsap.set(item, {
      x: x,
      y: y,
      z: z,
      transformStyle: "preserve-3d",
    });
  });

  // 鼠标交互效果
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to(".skills-sphere", {
      rotationY: x,
      rotationX: -y,
      duration: 2,
      ease: "power3.out",
    });
  });
}

// 高级粒子系统
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById("particle-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: 0, y: 0, radius: 100 };

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
    this.animate();
    this.bindEvents();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = Math.min(150, Math.floor((this.canvas.width * this.canvas.height) / 8000));

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 更新和绘制粒子
    this.particles.forEach((particle) => {
      particle.update(this.mouse);
      particle.draw(this.ctx);
    });

    // 连接粒子
    this.connectParticles();

    requestAnimationFrame(() => this.animate());
  }

  connectParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(245, 245, 245, ${0.2 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.particles = [];
      this.createParticles();
    });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
}

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
  }

  update(mouse) {
    this.x += this.vx;
    this.y += this.vy;

    // 鼠标交互
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      const angle = Math.atan2(dy, dx);
      const force = (mouse.radius - distance) / mouse.radius;
      this.vx += Math.cos(angle) * force * 0.1;
      this.vy += Math.sin(angle) * force * 0.1;
    }

    // 边界检查
    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(245, 245, 245, ${this.alpha})`;
    ctx.fill();
  }
}

// 初始化粒子系统
document.addEventListener("DOMContentLoaded", () => {
  new ParticleSystem();
});

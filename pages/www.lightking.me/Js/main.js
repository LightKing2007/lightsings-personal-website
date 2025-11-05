// 夜间模式切换
document.querySelector(".dark-mode-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  // 保存用户偏好
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  // 更新按钮图标
  this.textContent = isDarkMode ? "☀️" : "🌙";
});

// 检查本地存储中的夜间模式偏好
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  document.querySelector(".dark-mode-toggle").textContent = "☀️";
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// 粒子背景效果（可选）
function initParticleBackground() {
  // 使用particles.js或其他库实现
}

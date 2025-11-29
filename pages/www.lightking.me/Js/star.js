// --- 星星背景生成 ---
function createStars() {
  const starsContainer = document.getElementById("stars-container");
  if (!starsContainer) {
    // 如果容器不存在，则不执行
    console.warn("Star container not found. Skipping star creation.");
    return;
  }
  const numStars = 100; // 星星数量

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = star.style.height = `${Math.random() * 3 + 1}px`; // 1到4px
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * -3}s`; // 随机延迟，错开闪烁
    star.style.animationDuration = `${Math.random() * 2 + 2}s`; // 2到4秒的闪烁周期
    starsContainer.appendChild(star);
  }
}

// 确保在 DOM 加载完毕后运行星星生成函数
document.addEventListener("DOMContentLoaded", () => {
  createStars();
});

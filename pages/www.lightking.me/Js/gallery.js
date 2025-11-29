function setupSeamlessScroll() {
  const track1 = document.querySelector(".gallery-track-1");
  const track2 = document.querySelector(".gallery-track-2");

  if (!track1 || !track2) {
    console.error("Gallery tracks not found. Check selectors.");
    return;
  }

  // 1. 设置 track 的总宽度，以容纳所有元素（这对于 flex 布局是必需的）
  // 确保 track 能够容纳两倍内容
  function setTrackWidth(track) {
    let totalWidth = 0;
    // 累加所有子元素的宽度和 margin
    gsap.utils.toArray(track.children).forEach((item) => {
      const style = window.getComputedStyle(item);
      totalWidth += item.offsetWidth + parseFloat(style.marginRight);
    });
    track.style.width = `${totalWidth}px`;
    return totalWidth;
  }

  const totalWidth1 = setTrackWidth(track1);
  const totalWidth2 = setTrackWidth(track2);

  // 2. 关键计算：滚动距离是总宽度的一半（即单个内容块的宽度）
  const scrollDistance1 = totalWidth1 / 2;
  const scrollDistance2 = totalWidth2 / 2;

  console.log(`Track 1 calculated total width: ${totalWidth1}px`);
  console.log(`Track 1 scroll distance: ${scrollDistance1}px`);

  // 3. 使用 GSAP 实现无缝循环滚动
  function createLoop(target, distance, duration, direction) {
    // 目标距离：向左滚动是负数，向右滚动是正数
    const finalX = direction === "forward" ? -distance : 0;
    const startX = direction === "forward" ? 0 : -distance;

    // 确保起始位置正确设置 (特别是反向滚动)
    gsap.set(target, { x: startX });

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
    });

    tl.to(target, {
      x: finalX, // 动画终点
      duration: duration,
      ease: "none",
      // 当循环结束，GSAP会自动跳回起点 (startX)，实现无缝
    });

    // 鼠标悬停暂停/播放控制
    target.addEventListener("mouseenter", () => tl.pause());
    target.addEventListener("mouseleave", () => tl.play());

    return tl;
  }

  // 行 1：向左 (正向滚动)
  const tl1 = createLoop(track1, scrollDistance1, 30, "forward");

  // 行 2：向右 (反向滚动)
  const tl2 = createLoop(track2, scrollDistance2, 30, "reverse");

  // 确保窗口大小改变时刷新布局
  window.addEventListener("resize", () => {
    // 在实际项目中，需要销毁旧动画并重新运行 setupSeamlessScroll。
    // 为了简单，建议在开发完成后，避免在滚动时调整窗口大小。
  });
}

// 确保在 DOM 加载完毕后运行动画设置
document.addEventListener("DOMContentLoaded", setupSeamlessScroll);

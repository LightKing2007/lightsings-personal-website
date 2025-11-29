gsap.registerPlugin(TextPlugin);

function setupTypewriter() {
  // --- 元素获取 (解构赋值，简化代码) ---
  const textContainer = document.getElementById("text-container");
  const textElement = document.getElementById("welcome-text");
  const cursor = document.getElementById("cursor");

  if (!textContainer || !textElement || !cursor) {
    console.error("GSAP Initialization Error: One or more target elements were not found.");
    return;
  }

  // --- 常量定义 ---
  const phrases = ["Hello, I'm LightKing.", "你好, 我是LightKing.", "I'm a developer.", "我是一名开发者.", "Welcome to my website.", "欢迎来到我的个人网站."];
  const DURATION_TYPE = 1.5;
  const DURATION_DELETE = 1.5;
  const DURATION_PAUSE = 3.0;

  const masterTl = gsap.timeline({ repeat: -1 });

  // --- 独立动画 (不加入主时间线) ---
  gsap.to(cursor, { opacity: 0, ease: "power2.inOut", repeat: -1, yoyo: true, duration: 0.8 });

  // --- 核心循环逻辑 ---
  phrases.forEach((phrase) => {
    let requiredWidth = 0; // 局部变量，用于存储当前短语的宽度

    // 1. 设置文本 (瞬间)
    masterTl.set(textElement, { text: phrase });

    // 2. 测量宽度 (同步调用，发生在动画前)
    masterTl.call(() => {
      // 强制浏览器计算 max-content 宽度，并测量 scrollWidth + 2px 缓冲
      textContainer.style.width = "max-content";
      requiredWidth = textContainer.scrollWidth + 2;
      textContainer.style.width = "0px";
    });

    // 3. 打字 (宽度从 0 动画到测量值)
    masterTl.to(
      textContainer,
      {
        duration: DURATION_TYPE,
        // 使用函数动态获取 requiredWidth 的值
        width: () => requiredWidth + "px",
        ease: "power1.inOut",
      },
      ">"
    );

    // 4. 暂停
    masterTl.to({}, { duration: DURATION_PAUSE });

    // 5. 删除 (宽度从测量值动画到 0)
    masterTl.to(textContainer, {
      duration: DURATION_DELETE,
      width: 0,
      ease: "power1.inOut",
    });

    // 6. 重置 (清空文本，准备下一句)
    masterTl.set(textElement, { text: "" });
  });
}

document.addEventListener("DOMContentLoaded", setupTypewriter);

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // 1. 顶部变量定义 (解决 navLinksContainer is not defined)
  // =========================================================
  const navbar = document.getElementById("navbar");
  const navLinksContainer = document.getElementById("nav-links");
  const menuToggle = document.querySelector(".menu-toggle");

  // -----------------------------------------------------
  // 2. 导航栏隐藏/显示逻辑 (上滑出现，下滑隐藏)
  // -----------------------------------------------------
  if (navbar) {
    let lastScrollY = 0;
    const navHeight = navbar.offsetHeight;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > navHeight) {
        navbar.classList.add("nav-hidden");
      } else if (currentScrollY < lastScrollY || currentScrollY <= 0) {
        navbar.classList.remove("nav-hidden");
      }
      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  // -----------------------------------------------------
  // 3. 汉堡菜单折叠逻辑 (仅当两个关键元素都存在时才运行)
  // -----------------------------------------------------
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active");
      menuToggle.classList.toggle("active");

      const isExpanded = menuToggle.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });

    // 修复：点击链接后关闭菜单
    navLinksContainer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navLinksContainer.classList.remove("active");
          menuToggle.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  } else {
    console.warn("Menu Toggle Warning: Elements '.menu-toggle' or '#nav-links' not found.");
  }
});

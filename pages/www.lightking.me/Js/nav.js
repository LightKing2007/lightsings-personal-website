document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinksContainer = document.getElementById("nav-links");
  const menuToggle = document.querySelector(".menu-toggle");

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

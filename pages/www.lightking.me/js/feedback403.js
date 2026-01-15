function goBack() {
  window.history.back();
}

function goHome() {
  window.location.href = "https://www.lightking.me";
}

function contactSupport() {
  // 在实际应用中替换为您的支持邮箱
  const email = "LightWork7002@outlook.com";
  const subject = "403 禁止访问问题";
  const body = "我在尝试访问页面时遇到了403错误, 页面URL是: " + window.location.href;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// 添加键盘快捷键支持
document.addEventListener("keydown", (e) => {
  // 按ESC返回上一页
  if (e.key === "Escape") goBack();
  // 按H键访问首页
  if (e.key === "h" || e.key === "H") goHome();
});

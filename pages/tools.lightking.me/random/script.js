function draw() {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);
  const count = parseInt(document.getElementById("count").value);
  const dup = document.getElementById("dup").checked;

  if (isNaN(min) || isNaN(max) || isNaN(count) || count < 1) {
    alert("请检查输入！");
    return;
  }
  if (min > max) {
    alert("最小值不能大于最大值");
    return;
  }
  if (!dup && max - min + 1 < count) {
    alert("区间内的数字不够抽，请允许重复或调小个数");
    return;
  }

  let arr = [];
  if (dup) {
    // 有放回
    for (let i = 0; i < count; i++) {
      arr.push(randInt(min, max));
    }
  } else {
    // 无放回：Fisher–Yates shuffle 抽前 count 个
    let pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    arr = pool.slice(0, count);
  }

  // 显示结果
  document.getElementById("result").innerHTML = '<div style="margin-bottom:8px;font-weight:600">抽取结果：</div>' + arr.map((n) => `<span class="tag">${n}</span>`).join("");
}

// 工具：生成 [min, max] 的随机整数
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

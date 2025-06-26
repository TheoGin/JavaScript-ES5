document.addEventListener("DOMContentLoaded", function () {
  // 2. interactive：触发DOMContentLoaded事件
  console.log(document.readyState); // interactive
});

console.log(document.readyState); // loading，正在加载，就算是写在最后一行里面的script代码块也是loading，因为还有闭合标签script等

window.onload = function () {
  // 3. complete：触发window的load事件
  console.log(document.readyState); // complete
};

document.onreadystatechange = function () {
  console.log(document.readyState);
  /* 输出
      interactive（从一开始的 loading变成interactive）
      complete（从interactive变成complete）
    */
};

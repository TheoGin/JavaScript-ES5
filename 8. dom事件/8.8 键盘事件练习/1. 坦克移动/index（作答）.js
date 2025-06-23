/* 
    编写一个页面，在页面中放置一个坦克，可以通过按键操作：
    1. 光标控制坦克的方向和移动
    2. 按住shift键可以加速移动
*/
var img = document.querySelector("img");

document.onkeydown = function (e) {
  var style = getComputedStyle(img);

  if (e.key === "ArrowUp") {
    updateImgSrc("imgs/tankU.gif");
  }
  if (e.key === "ArrowRight") {
    updateImgSrc("imgs/tankR.gif");
    var left = parseFloat(style.left);
    img.style.left = left + 5 + "px";
  }
  if (e.key === "ArrowDown") {
    updateImgSrc("imgs/tankD.gif");
    var top = parseFloat(style.top);
    img.style.top = top + 5 + "px";
  }
  if (e.key === "ArrowLeft") {
    updateImgSrc("imgs/tankL.gif");
    var right = parseFloat(style.right);
    img.style.right = right + 5 + "px";
  }
  /* if (e.key === "ArrowUp") {
    img.src = "imgs/tankU.gif";
  }
  if (e.key === "ArrowRight") {
    img.src = "imgs/tankR.gif";
  }
  if (e.key === "ArrowDown") {
    img.src = "imgs/tankD.gif";
  }
  if (e.key === "ArrowLeft") {
    img.src = "imgs/tankL.gif";
  } */
};

/**
 * 更新图片src
 * @param {*} src
 */
function updateImgSrc(src) {
  img.src = src;
}

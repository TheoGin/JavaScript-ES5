/* 
    编写一个页面，在页面中放置一个坦克，可以通过按键操作：
    1. 光标控制坦克的方向和移动
    2. 按住shift键可以加速移动
*/

/**
 * 坦克对象
 */
var tank = {
  direction: "U", // U L R D。默认方向向上U
  dom: document.querySelector("img"), // img的dom对象
  left: 500, // 初始离左边距离
  top: 300, // 初始离上边距离
  step: 5, // 移动步数
  show: function () {
    // 设置坦克位置和展示，可以避免重复代码
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
    this.dom.src = `imgs/tank${this.direction}.gif`;
  },
};

// 切换方向 和 移动
document.addEventListener("keydown", function (e) {
  // 用addEventListener，若代码过多，可以监听同个事件，然后分开写

  if (e.key === "ArrowUp") {
    tank.direction = "U";
    tank.top -= tank.step; // 都有top，但是用减
  }
  if (e.key === "ArrowDown") {
    tank.direction = "D";
    tank.top += tank.step;
  }
  if (e.key === "ArrowLeft") {
    tank.direction = "L";
    tank.left -= tank.step;
  }
  if (e.key === "ArrowRight") {
    tank.direction = "R";

    // 移动不平滑，需要后面的知识
    tank.left += tank.step;
  }
  tank.show();
});

// 控制不要移出上左边界，可以用left < 0 和top < 0来判断；而下右边界需要后面的知识
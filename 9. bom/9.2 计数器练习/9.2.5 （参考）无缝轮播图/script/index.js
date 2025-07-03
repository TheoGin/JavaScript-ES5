// 配置对象
var config = {
  imgWidth: 520, // 图片的宽度
  dotWidth: 12, // 一个小圆点的宽度
  doms: {
    // 涉及的dom对象
    divImgs: document.querySelector(".banner .imgs"),
    divDots: document.querySelector(".banner .dots"),
    divArrow: document.querySelector(".banner .arrow"),
    divBanner: document.querySelector(".banner"),
  },
  curImgIndex: 0, // 当前实际图片索引，0 ~ imgNum - 1
  timer: {
    // JS实现动画运动计时器配置对象
    id: null, // 计时器id
    duration: 16, // 运动间隔的时间，单位毫秒（浏览器刷新频率：16.6666ms（毫秒）不断在刷新，就是不断重绘）
    total: 300, // 动画运动总共运动时长，单位毫秒
  },
  autoTimer: {
    // 自动移动定时器配置
    id: null,
    duration: 2000,
  },
};

// 总共的图片数量
config.imgNum = config.doms.divImgs.children.length;

/**
 * 初始化元素尺寸（图片列表和小圆点宽度）
 */
function initSize() {
  // div.imgs宽度不固定的，用js动态计算。数量多加2：用于无缝衔接的图片元素
  config.doms.divImgs.style.width =
    config.imgWidth * (config.imgNum + 2) + "px";

  // 所有小圆点宽度不固定的，用js动态计算
  config.doms.divDots.style.width = config.dotWidth * config.imgNum + "px";
}

/**
 * 初始化小圆点元素；克隆用于无缝衔接的图片元素
 */
function initElement() {
  // 创建小圆点元素
  for (var i = 0; i < config.imgNum; i++) {
    var span = document.createElement("span");
    config.doms.divDots.appendChild(span);
  }

  // 克隆用于无缝衔接的图片元素
  var children = config.doms.divImgs.children;
  var firstChild = children[0],
    lastChild = children[children.length - 1];
  var newImg = firstChild.cloneNode(true); // 深度克隆
  config.doms.divImgs.appendChild(newImg);
  newImg = lastChild.cloneNode(true);
  config.doms.divImgs.insertBefore(newImg, firstChild);
}

/**
 * 设置小圆点是否激活
 */
function setDotsIsActiveStatus() {
  for (var i = 0; i < config.imgNum; i++) {
    var dot = config.doms.divDots.children[i];
    if (i === config.curImgIndex) {
      dot.className = "active";
    } else {
      dot.className = "";
    }
  }
}

/**
 * 初始化第一张图片的位置
 */
function initDivImgsPosition() {
  /* curImgIndex
         0:        -imgWidth
         1:        -2 * imgWidth
         2:        -3 * imgWidth
         3:        -4 * imgWidth
     ----> (-curImgIndex - 1) * imgWidth
  */
  var newMarginLeft = (-config.curImgIndex - 1) * config.imgWidth;
  config.doms.divImgs.style.marginLeft = newMarginLeft + "px";
}

/**
 * 轮播图所有初始化汇总方法
 */
function init() {
  initSize();
  initElement();
  setDotsIsActiveStatus();
  initDivImgsPosition();
}

init();

/**
 * 图片切换到索引index，图片方向没有传递默认向左移动
 * @param {*} index
 * @param {*} direction
 */
function switchTo(index, direction) {
  if (index === config.curImgIndex) {
    // 当前图片索引就是要移动的图片索引，不做任何处理
    return; // 排除 目标left = 当前left 的情况
  }
  if (!direction) {
    // 图片方向没有传递默认向左移动
    direction = "left";
  }

  // 小圆点也要跟着移动
  config.curImgIndex = index; // 重新设置当前索引
  setDotsIsActiveStatus();

  var targetMarginLeft = (-index - 1) * config.imgWidth; // 目标left
  // config.doms.divImgs.style.marginLeft = targetMarginLeft + "px"; // 不用动画过程，就写完了
  // 把上面一行代码换成动画的移动过程
  animateSwitch();

  /**
   * JS实现动画运动过程
   */
  function animateSwitch() {
    // 如果一直点击，就会开启很多个事件，所以先把之前的事件清除掉，只触发最后一次
    stopAnimate();

    // 1. 计算动画运动次数
    var animatePlayNum = Math.ceil(config.timer.total / config.timer.duration); // 可能算出小数，例如：total为11ms，duration为3ms，则会算出小数，要向上取整，多一次来运动动画最后一次除数的余数
    var curNumber = 0; // 当前的运动次数

    // 2. 计算总距离moveTotalDistance
    var moveTotalDistance; // 移动距离
    var style = getComputedStyle(config.doms.divImgs);
    var curMarginLeft = parseFloat(style.marginLeft);

    // var realDivImgsTotalWidth = config.imgWidth * (config.imgNum + 2); // 不要加2，因为额外图片是帮助滚动的，不应该对整个长度产生影响
    var realDivImgsTotalWidth = config.imgWidth * config.imgNum; // 实际整个长度。不能包含两个额外的，实际的组成环才是正常的整个长度

    // 向左移动：
    if (direction === "left") {
      // 目标left < 当前left
      if (targetMarginLeft < curMarginLeft) {
        // 移动距离：目标left - 当前left（负数相加）
        moveTotalDistance = targetMarginLeft - curMarginLeft;
      } else {
        // 目标left > 当前left
        //  移动距离：-（整个长度 - |目标left - 当前left|）
        moveTotalDistance = -(
          realDivImgsTotalWidth - Math.abs(targetMarginLeft - curMarginLeft)
        );
      }
    } else {
      // 向右移动：
      // 目标left > 当前left
      if (targetMarginLeft > curMarginLeft) {
        // 移动距离：目标left - 当前left（正数相加）
        moveTotalDistance = targetMarginLeft - curMarginLeft;
      } else {
        // 当前left > 目标left
        // 移动距离：整个长度 - |目标left - 当前left|
        moveTotalDistance =
          realDivImgsTotalWidth - Math.abs(targetMarginLeft - curMarginLeft);
      }
    }

    // 3. 计算每次移动距离。
    // var everyDistance = Math.ceil(moveTotalDistance / animatePlayNum); // 错误写法，不需要向上取整！！！
    var everyDistance = moveTotalDistance / animatePlayNum; // 精确除开

    config.timer.id = setInterval(function () {
      // 改变当前div的marginleft
      curMarginLeft += everyDistance;

      // if (Math.abs(curMarginLeft) > realDivImgsTotalWidth) {
      // 还要判断方向，不然会有闪动问题！！！
      if (
        direction === "left" &&
        Math.abs(curMarginLeft) > realDivImgsTotalWidth
      ) {
        // 图片向左移动，移动一点点到额外辅助图片元素（大于 实际图片总宽度），就迅速移到实际的图片元素
        curMarginLeft += realDivImgsTotalWidth;
      } else if (
        direction === "right" &&
        Math.abs(curMarginLeft) < config.imgWidth
      ) {
        // 图片向右移动，移动一点点到额外辅助图片元素（小于 一个图片元素的宽度），就迅速移到实际的图片元素
        curMarginLeft -= realDivImgsTotalWidth;
      }

      config.doms.divImgs.style.marginLeft = curMarginLeft + "px"; // 用动画就是慢慢的改变，而不是一下改变！！ 有问题，会挪不会回来

      // 要控制运动次数之后结束动画，不然动画就会一直下去！！！
      curNumber++;

      if (curNumber === animatePlayNum) {
        stopAnimate();
      }
    }, config.timer.duration);
  }

  /**
   * 清除计时器
   */
  function stopAnimate() {
    clearInterval(config.timer.id);
    config.timer.id = null;
  }
}

// 箭头点击事件。用事件委托
config.doms.divArrow.onclick = function (e) {
  // 箭头点击是看到图片的方向，与图片移动方向相反
  if (e.target.classList.contains("left")) {
    toLeft();
  } else if (e.target.classList.contains("right")) {
    toRight();
  }
};

function toLeft() {
  var index = config.curImgIndex - 1;
  if (index < 0) {
    index = config.imgNum - 1;
  }
  switchTo(index, "right"); // 而不只是调用setDotsIsActiveStatus函数！！！
}

function toRight() {
  var index = (config.curImgIndex + 1) % config.imgNum;
  switchTo(index, "left"); // 而不只是调用setDotsIsActiveStatus函数！！！
}

// 小圆点点击事件
config.doms.divDots.onclick = function (e) {
  if (e.target.tagName === "SPAN") {
    // var index = Array.from(config.doms.divDots.children).indexOf(e.target);
    var index = Array.from(this.children).indexOf(e.target);
    switchTo(index, index > config.curImgIndex ? "left" : "right");
  }
};

/* config.autoTimer.id = setInterval(function () {
  toRight();
}, config.autoTimer.duration); */
// 简化写法，直接传函数名
config.autoTimer.id = setInterval(toRight, config.autoTimer.duration);

// 鼠标进入时轮播图自动播放停止，即清除定时器
config.doms.divBanner.onmouseenter = function () {
  clearInterval(config.autoTimer.id);
  config.autoTimer.id = null;
};

// 鼠标离开时轮播图自动播放又开始，即重新开启定时器
config.doms.divBanner.onmouseleave = function () {
  /* config.autoTimer.id = setInterval(function () {
    toRight();
  }, config.autoTimer.duration); */
  // 简化写法，直接传函数名
  config.autoTimer.id = setInterval(toRight, config.autoTimer.duration);
};

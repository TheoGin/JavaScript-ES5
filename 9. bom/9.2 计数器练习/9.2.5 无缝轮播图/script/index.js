var banner = {
  imgArr: ["./img/1.jpg", "./img/2.webp", "./img/3.jpg"],
  imgsDiv: document.querySelector(".imgs"),
  width: 520,
  curImgIndex: 0,
  dotsDiv: document.querySelector(".dots"),
  leftDiv: document.querySelector(".left"),
  rightDiv: document.querySelector(".right"),
  duration: 2000,
};

function init() {
  initInterval();
}

init();

var timerId;

/**
 * 初始化定时器
 */
function initInterval() {
  timerId = setInterval(function () {
    banner.curImgIndex++;
    if (banner.curImgIndex >= banner.imgArr.length) {
      banner.curImgIndex = 0;
    }
    setImgsMarginLeft();

    activeDot();
  }, banner.duration);
}

/**
 * 设置图片列表div左边距
 */
function setImgsMarginLeft() {
  banner.imgsDiv.style.marginLeft = -banner.width * banner.curImgIndex + "px";
}

/**
 * 激活小圆点
 */
function activeDot() {
  var spanActive = document.querySelector(".dots span.active");
  spanActive.className = "";
  banner.dotsDiv.children[banner.curImgIndex].className = "active";
}

// 左箭头事件
banner.leftDiv.onclick = function () {
  clearInterval(timerId);
  setCurImgIndex(banner.curImgIndex - 1);
  initInterval();
};

// 右箭头事件
banner.rightDiv.onclick = function () {
  clearInterval(timerId);
  setCurImgIndex(banner.curImgIndex + 1);
  initInterval();
};

/**
 * 设置当前图片索引
 * @param {*} index
 */
function setCurImgIndex(index) {
  if (index < 0) {
    index = banner.imgArr.length - 1;
  }
  if (index >= banner.imgArr.length) {
    index = 0;
  }
  banner.curImgIndex = index;

  setImgsMarginLeft();

  activeDot();
}

banner.dotsDiv.onclick = function (e) {
  if (e.target.tagName === "SPAN") {
    var index = Array.from(banner.dotsDiv.children).indexOf(e.target);

    clearInterval(timerId);

    setCurImgIndex(index);

    initInterval();
  }
};

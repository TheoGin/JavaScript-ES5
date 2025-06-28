/* 许愿墙：颜色、位置随机
1. 添加拖动功能，不能拖动到页面外
2. 如果页面尺寸变化，贴纸的位置会发生相应的变化，始终保证贴纸可见。
*/

/**
 * 得到一个最小值到最大值之间的随机整数（取得到最大值）
 * @param {*} min
 * @param {*} max
 * @returns
 */
function getRandom(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * 初始化
 */
(function () {
  var doms = {
    hopeContainer: document.querySelector(".hope-container"),
    divs: document.querySelectorAll(".item"),
    form: document.querySelector(".input-hope-container"),
    input: document.querySelector(".input-hope-container input"),
    // close: document.querySelector(".close"),
  };

  /* var hope = {
    setPosition: function () {
      div.style.left = getRandom(0, htmlWidth) + "px";
      div.style.top = getRandom(0, htmlHeight) + "px";
    },
  }; */

  initDivs();
  initFormEvent();
  initClose();
  initMouseMove();

  /**
   * 初始化一开始两个div
   */
  function initDivs() {
    Array.from(doms.divs).forEach(function (div) {
      initDiv(div);
    });
  }

  /**
   * 初始化一个许愿墙
   * @param {*} div
   */
  function initDiv(div) {
    // 视口宽高，不包含滚动条
    var htmlWidth = document.documentElement.clientWidth;
    var htmlHeight = document.documentElement.clientHeight;
    // console.log('111', htmlWidth, htmlHeight);

    if (htmlWidth < 0) {
      htmlWidth = 0;
    }
    if (htmlHeight < 0) {
      htmlHeight = 0;
    }
    if (htmlWidth > htmlWidth - 70 - 180) {
      htmlWidth = htmlWidth - 70 - 180;
    }
    if (htmlHeight > htmlHeight - 70 - 180) {
      htmlHeight = htmlHeight - 70 - 180;
    }
    // console.log('222', htmlWidth, htmlHeight);

    div.style.left = getRandom(0, htmlWidth) + "px";
    div.style.top = getRandom(0, htmlHeight) + "px";
    div.style.background = `rgb(${getRandom(0, 255)}, ${getRandom(
      0,
      255
    )}, ${getRandom(0, 255)})`;
  }

  /**
   * 初始化form回车事件
   */
  function initFormEvent() {
    doms.form.onsubmit = function (e) {
      e.preventDefault();

      var div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `${doms.input.value}<span class="close">X</span>`;
      initDiv(div);

      doms.hopeContainer.appendChild(div);

      doms.input.value = "";
    };
  }

  /**
   * 关闭许愿墙
   */
  function initClose() {
    // 用事件委托
    doms.hopeContainer.onclick = function (e) {
      if (e.target.className === "close") {
        doms.hopeContainer.removeChild(e.target.parentElement);
      }
    };
  }

  /**
   * 初始化鼠标移动
   */
  function initMouseMove() {
    /* Array.from(doms.divs).forEach(function (div) {
      div.onmousemove = function (e) {
        // console.log(e);
      };
    }); */
    /* doms.hopeContainer.onmousedown = function (e) {
      e.preventDefault();
      var target = e.target;

      if (target.className === "item") {
        var style = getComputedStyle(target);
        var divLeft = parseFloat(style.left);
        var divTop = parseFloat(style.top);
        console.log("left, top", divLeft, divTop);

        target.onmousemove = function (e) {
          console.log(e.movementX, e.movementY);
          var disLeft = divLeft + e.movementX;
          var disTop = divTop + e.movementY;
          console.log(disLeft, disTop);
          target.style.left = disLeft + "px";
          target.style.top = disTop + "px";
        };

        // target.onmouseleave = function () {
        target.onmouseup = target.onmouseleave = function () {
          target.onmousemove = null;
        };
      }
    }; */

    doms.hopeContainer.onmousedown = function (e) {
      e.preventDefault();
      var target = e.target;

      if (target.className === "item") {
        var style = getComputedStyle(target);
        var divLeft = parseFloat(style.left);
        var divTop = parseFloat(style.top);
        var pageX = e.pageX;
        var pageY = e.pageY;

        window.onmousemove = function (e) {
          var disX = e.pageX - pageX + divLeft;
          var disY = e.pageY - pageY + divTop;

          if (disX < 0) {
            disX = 0;
          }

          if (disY < 0) {
            disY = 0;
          }

          if (disX > document.documentElement.clientWidth - 190) {
            disX = document.documentElement.clientWidth - 190;
          }

          if (disY > document.documentElement.clientWidth - 190) {
            disY = document.documentElement.clientHeight - 190 - 70 - 10;
          }

          target.style.left = disX + "px";
          target.style.top = disY + "px";
        };

        // target.onmouseleave = function () {
        window.onmouseup = window.onmouseleave = function () {
          window.onmousemove = null;
        };
      }
    };
  }
})();

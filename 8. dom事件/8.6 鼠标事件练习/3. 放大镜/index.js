// 写成立即执行函数，可以防止污染全局变量
(function () {
  // 配置信息
  var config = {
    smallBg: "./images/mouse.jpg", // 小图背景路径
    bigBg: "./images/mouseBigSize.jpg", // 大图背景路径,
    divSmall: document.querySelector(".small"), // 小图div的dom对象
    divBig: document.querySelector(".big"), // 大图div的dom对象
    divMove: document.querySelector(".move"), // 可移动div的dom对象,
    // 小图尺寸
    smallImgSize: {
      width: 350,
      height: 350,
    },
    // 大图尺寸
    bigImgSize: {
      width: 800,
      height: 800,
    },
    // 大的div的尺寸
    bigDivSize: {
      width: 540,
      height: 540,
    },
  };
  // 可移动div的尺寸 / 小图尺寸 = 大的div的尺寸 / 大图尺寸--->
  // 可移动div的尺寸 = 大的div的尺寸 / 大图尺寸 * 小图尺寸
  config.divMoveSize = {
    width:
      (config.bigDivSize.width / config.bigImgSize.width) *
      config.smallImgSize.width,
    height:
      (config.bigDivSize.height / config.bigImgSize.height) *
      config.smallImgSize.height,
  };

  initDivBg();
  initDivMoveSize();
  initDivSmallEvent();

  /**
   * 初始化div背景图
   */
  function initDivBg() {
    // 100% 100%让图片的尺寸刚好撑满盒子
    config.divSmall.style.background = `url(${config.smallBg}) no-repeat left top/100% 100%`;
    config.divBig.style.background = `url(${config.bigBg}) no-repeat`;
  }

  /**
   * 初始化可移动div的尺寸
   */
  function initDivMoveSize() {
    setDivMoveSize();
  }

  /**
   * 设置可移动div的尺寸
   */
  function setDivMoveSize() {
    config.divMove.style.width = config.divMoveSize.width + "px";
    config.divMove.style.height = config.divMoveSize.height + "px";
  }

  /**
   * 初始小图div事件
   */
  function initDivSmallEvent() {
    config.divSmall.onmouseenter = function () {
      config.divMove.style.display = "block";
      config.divBig.style.display = "block";
    };

    config.divSmall.onmouseleave = function () {
      config.divMove.style.display = "none";
      config.divBig.style.display = "none";
    };

    config.divSmall.onmousemove = function (e) {
      var offset = getOffset(e);
      setDivSmallPosition(offset);
      setDivBigPosition();
      // console.log(offset);
    };

    /**
     * 设置大图背景图的位置
     */
    function setDivBigPosition() {
      var divMoveStyle = getComputedStyle(config.divMove);
      var left = parseFloat(divMoveStyle.left);
      var top = parseFloat(divMoveStyle.top);
      // 小图left / 小图宽度 = 大图left / 大图div宽度
      config.divBig.style.backgroundPositionX =
        -(left / config.smallImgSize.width) * config.bigDivSize.width + "px";
      config.divBig.style.backgroundPositionY =
        -(top / config.smallImgSize.height) * config.bigDivSize.height + "px";
    }

    /**
     * 根据偏移量设置可移动div的位置
     * @param {*} offset
     */
    function setDivSmallPosition(offset) {
      var left = offset.x - config.divMoveSize.width / 2;
      var top = offset.y - config.divMoveSize.height / 2;
      //   console.log(offset.x, offset.y);
      //   console.log(config.divMoveSize.height / 2, config.divMoveSize.width / 2);
      //   console.log(left, top);
      if (left < 0) {
        left = 0;
      }
      if (top < 0) {
        top = 0;
      }
      var maxLeft = config.smallImgSize.width - config.divMoveSize.width;
      if (left > maxLeft) {
        left = maxLeft;
      }
      var maxTop = config.smallImgSize.height - config.divMoveSize.height;
      if (top > maxTop) {
        top = maxTop;
      }

      config.divMove.style.left = left + "px";
      config.divMove.style.top = top + "px";
    }

    /**
     * 根据事件对象获取偏移量（写上参数的类型MouseEvent，会有提示）
     * @param {MouseEvent} e
     */
    function getOffset(e) {
      // offset：offsetX、offsetY，鼠标相对于【事件源】的内边距的坐标，所以当鼠标放到divMove时，获取到offsetX、offsetY的是undefined
      if (e.target === config.divSmall) {
        // 当鼠标事件源放到divSmall时
        return {
          x: e.offsetX,
          y: e.offsetY,
        };
      }
      // 当鼠标事件源放到divMove时
      var divMoveStyle = getComputedStyle(config.divMove);
      var left = parseFloat(divMoveStyle.left);
      var top = parseFloat(divMoveStyle.top);
      /* return {
        x: e.offsetX - config.divMoveSize.width / 2,
        y: e.offsetY - config.divMoveSize.height / 2,
      }; */
      return {
        x: left + e.offsetX + 1, // 加1是边框的尺寸
        y: top + e.offsetY + 1, // 加1是边框的尺寸
      };
    }
  }
})();

/**
 * 游戏配置
 */
var gameConfig = {
  width: 500, // 图片宽度
  height: 500, // 图片高度
  rows: 3, // 行数
  cols: 3, // 列数
  // imgSrc: '../img/lol.png', // 错误写法，因为js是要看运行时候的路径，而不是书写的路径，运行的时候是放到页面运行的
  imgSrc: "img/lol.png", // 图片路径
  dom: document.getElementById("game"), // 拿到div的dom对象
  // pieceWidth: width / 3, // Uncaught ReferenceError: width is not defined
  // pieceWidth: this.width / 3, // pieceWidth: NaN，因为this只能在方法中用——》通过创建完对象之后，动态添加属性的方式添加pieceWidth
  isOver: false, // 用于记录游戏是否结束，如果结束则不能再触发点击事件
};

// 宽度对应的是列数！！
gameConfig.pieceWidth = gameConfig.width / gameConfig.cols; // 每一个小方块的宽度
gameConfig.pieceHeight = gameConfig.height / gameConfig.rows; // 每一个小方块的高度

// 小方块数组
var blocks = [];

/**
 * 创建每一个小方块元素，离左边、上边、正确左边、正确上边的距离
 * @param {*} left
 * @param {*} top
 * @param {*} isVisible 用于控制最后一块不显示
 */
function Block(left, top, isVisible) {
  this.left = left;
  this.top = top;
  this.isVisible = isVisible; // 用于查找空白位置小方块
  this.correctLeft = this.left; // 初始正确离左边距离就是left
  this.correctTop = this.top; // 初始正确离顶部距离就是top

  this.dom = document.createElement("div");
  this.dom.style.width = gameConfig.pieceWidth + "px";
  this.dom.style.height = gameConfig.pieceHeight + "px";
  this.dom.style.position = "absolute";
  this.dom.style.cursor = "pointer";
  this.dom.style.border = "1px solid #fff";
  // 边框会占据尺寸
  this.dom.style.boxSizing = "border-box";
  this.dom.style.background = `url("${gameConfig.imgSrc}") -${this.correctLeft}px -${this.correctTop}px`;
  if (!isVisible) {
    this.dom.style.display = "none";
  }

  // 定位的位置不要直接用属性赋值，因为后面需要随机更改位置
  this.show = function () {
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  };
  this.show();

  gameConfig.dom.appendChild(this.dom);
}

/**
 * 生成min到max的随机数（包含max）
 * @param {*} min
 * @param {*} max
 */
function getRandom(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * 用当前小方块1与小方块2的位置进行交换
 * @param {*} block1
 * @param {*} block2
 */
function exchange(block1, block2) {
  // 1) 交换左边
  var tmp = block1.left;
  block1.left = block2.left;
  block2.left = tmp;
  // 2) 交换上边
  tmp = block1.top;
  block1.top = block2.top;
  block2.top = tmp;

  // block1.show();
  // 交换完需要全部重新设置位置，不然会出问题
  blocks.forEach(function (block) {
    // 交换完重新设置展示
    block.show();
  });
}

/**
 * 判断两个小方块是否相等
 * @param {*} float1
 * @param {*} float2
 */
function isEqual(float1, float2) {
  return parseInt(float1) === parseInt(float2);
}

/**
 * 初始化游戏
 */
function init() {
  // 1. 初始化游戏容器
  initGameContainer();

  // 2. 初始化小方块
  // 2.1 初始化小方块数组
  initBlockArray();

  // 2.2 打乱小方块顺序
  shuffle();

  // 3. 绑定点击事件
  regEvent();

  /**
   * 注册点击事件
   */
  function regEvent() {
    // 只找一个，用find方法
    var notVisibleBlock = blocks.find(function (block) {
      // return block.dom.style.display === 'none';
      // 或者
      return !block.isVisible;
    });

    blocks.forEach(function (block) {
      block.dom.onclick = function () {
        if (gameConfig.isOver) {
          return;
        }
        // 与空白交换位置（发现第二次有交换位置代码——》抽离交换位置代码
        // exchange(block, notVisibleBlock);

        /* 限制交换位置只能是与空白相邻的
          left: 0, top: 0   （空白小方块）
          left: 0, top: h   （相邻小方块）
          left: w, top: 0   （相邻小方块）
          left: 2w, top: 0  （非小方块）
      ——> 相邻的有一个方向相等，另一个方向差的绝对值等于w/h
        */
        // 判断相等需要注意小数问题，需要用parseInt转为整数比较，又因为后面判断是否结束游戏也需要用这个相等比较——》抽离成函数
        //  if(同一行 || 同一列)
        if (
          (block.left === notVisibleBlock.left &&
            isEqual(
              Math.abs(block.top - notVisibleBlock.top),
              gameConfig.pieceHeight
            )) ||
          (block.top === notVisibleBlock.top &&
            isEqual(
              Math.abs(block.left - notVisibleBlock.left),
              gameConfig.pieceWidth
            ))
        ) {
          exchange(block, notVisibleBlock);

          // 是否赢
          isWin();
        }
      };
    });
  }

  /**
   * 打乱小方块顺序（通过Array.sort()打乱的是数组，而不是小方块的位置）
   */
  function shuffle() {
    // blocks.length - 1是让最后一项不打乱位置
    for (var i = 0; i < blocks.length - 1; i++) {
      // 获取随机的下标
      // var index = getRandom(0, blocks.length - 1);
      var index = getRandom(0, blocks.length - 2); // blocks.length - 2是让最后一项不打乱位置

      // 用当前小方块与随机小方块的位置进行交换
      exchange(blocks[i], blocks[index]);
      /* // 1) 交换左边
      var tmp = blocks[i].left;
      blocks[i].left = blocks[index].left;
      blocks[index].left = tmp;
      // 2) 交换上边
      tmp = blocks[i].top;
      blocks[i].top = blocks[index].top;
      blocks[index].top = tmp; */
    }

    /* // 全部交换完再重新设置，不然会出问题
    blocks.forEach(function (block) {
      // 交换完重新设置展示
      block.show();
    }); */
  }

  /**
   * 初始化小方块数组
   [
    {
      left: 0,
      top: 0,
      correctLeft: 0,
      correctTop: 0,
    },
    ...
   ]
   */
  function initBlockArray() {
    for (var i = 0; i < gameConfig.rows; i++) {
      for (var j = 0; j < gameConfig.cols; j++) {
        /* w: 一个小方块的宽度；h：一个小方块的高度
              i     j         left     top
              0     0           0       0
              1     0           0       h
              1     1           w       h
              2     2           2w      2h
              2     1           w       2h
        ——>   i     j         j * w    i * h
        */
        /* blocks.push({
          left: j * gameConfig.pieceWidth,
          top: i * gameConfig.pieceHeight,
          correctLeft: 0, // 初始正确离左边距离就是left ————> 为了方便，写成一个对象
          correctTop: 0, // 初始正确离顶部距离就是top ————> 为了方便，写成一个对象
        }); */
        var isVisible = true; // 用于控制最后一块不显示
        if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
          isVisible = false;
        }
        var block = new Block(
          j * gameConfig.pieceWidth,
          i * gameConfig.pieceHeight,
          isVisible
        );
        blocks.push(block);
      }
    }
  }

  /**
   * 初始化游戏容器
   */
  function initGameContainer() {
    gameConfig.dom.style.width = gameConfig.width + "px";
    gameConfig.dom.style.height = gameConfig.height + "px";
    gameConfig.dom.style.border = "2px solid #ccc";
    gameConfig.dom.style.position = "relative";
  }
}

init();

/**
 * 是否拼图完成
 */
function isWin() {
  var correctBlocks = blocks.filter(function (block) {
    return block.left === block.correctLeft && block.top === block.correctTop;
  });
  // console.log(correctBlocks.length);
  if (correctBlocks.length === blocks.length) {
    // 用于记录游戏是否结束，如果结束则不能再触发点击事件
    gameConfig.isOver = true;

    blocks.forEach(function (block) {
      block.dom.style.border = "none";

      // 把空白块的元素也显示出来
      block.dom.style.display = "block";
    });
  }
}

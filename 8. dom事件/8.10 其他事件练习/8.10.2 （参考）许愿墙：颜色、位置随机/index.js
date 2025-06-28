/* 许愿墙：颜色、位置随机
1. 添加拖动功能，不能拖动到页面外
2. 如果页面尺寸变化，贴纸的位置会发生相应的变化，始终保证贴纸可见。
*/

/**
 * 初始化
 */
(function () {
  var doms = {
    hopeContainer: document.querySelector(".container"),
    divs: document.querySelectorAll(".paper"),
    input: document.querySelector(".input-hope-container input"),
    // close: document.querySelector(".close"),
  };
  var paperWidth = 170,
    paperHeight = 170;
  var viewportWidth = document.documentElement.clientWidth; //视口宽度
  var viewportHeight = document.documentElement.clientHeight; //视口高度
  // 用于记录当前拖拽在最顶层
  var zIndex = 1;

  // 实现拖拽功能
  mouseMove();

  createInitPapers();

  sendWish();
  // 实现关闭功能
  closeEvent();
  window.onresize = function () {
    // 变化距离：disWidth = 原来视口宽度 - 现在的视口宽度
    var disWidth = document.documentElement.clientWidth - viewportWidth;
    var disHeight = document.documentElement.clientHeight - viewportHeight;

    for (var i = 0; i < doms.hopeContainer.children.length; i++) {
      var paper = doms.hopeContainer.children[i];

      // 1. 计算横向对应距离newLeft来改变paper的left值
      // 因为前面创建好愿望，所以可以直接通过获取到paper.style.left，而不需计算
      var left = parseFloat(paper.style.left);
      var right = viewportWidth - left - paperWidth;
      // 是算出占比，再乘以变化的：left / (left + right) * disWidth。算出来是变化的，还要加上原来的！！！
      var newLeft = left + (left / (left + right)) * disWidth;
      // console.log(newLeft);
      paper.style.left = newLeft + "px";

      // 2. 计算纵向对应距离newTop来改变paper的top值
      var top = parseFloat(paper.style.top);
      // var bottom = viewportHeight - top - paperHeight - 80;
      var bottom = viewportHeight - top - paperHeight;
      var newTop = top + (top / (top + bottom)) * disHeight;
      paper.style.top = newTop + "px";
    }
    // 重新记录
    viewportWidth = document.documentElement.clientWidth;
    viewportHeight = document.documentElement.clientHeight;
  };

  function createInitPapers() {
    // 初始化两个愿望
    var wordsArr = ["早日遇到理想的另一半", "冲大厂，拿高薪！"];
    wordsArr.forEach(function (words) {
      createWish(words);
    });
  }

  /**
   * 鼠标移动
   */
  function mouseMove() {
    // doms.hopeContainer.onmousedown = function (e) {
    // 可以给window监听，并指定鼠标按下的元素是div.paper
    window.onmousedown = function (e) {
      // e.preventDefault();
      var div = getMoveDiv(e.target);
      if (!div) {
        return;
      }

      div.style.zIndex = zIndex++;

      var style = getComputedStyle(div);
      var divLeft = parseFloat(style.left);
      var divTop = parseFloat(style.top);

      // pageX、pageY，当前鼠标距离页面的横纵坐标
      var pageX = e.pageX;
      var pageY = e.pageY;

      window.onmousemove = function (e) {
        // 相对于原来的偏移量
        var disX = e.pageX - pageX;
        var disY = e.pageY - pageY;

        // 新的距离
        var newLeft = disX + divLeft;
        var newTop = disY + divTop;

        if (newLeft < 0) {
          newLeft = 0;
        }
        var maxLeft = document.documentElement.clientWidth - paperWidth;
        if (newLeft > maxLeft) {
          newLeft = maxLeft;
        }

        if (newTop < 0) {
          newTop = 0;
        }
        var maxTop = document.documentElement.clientHeight - paperHeight - 80;
        if (newTop > maxTop) {
          newTop = maxTop;
        }

        div.style.left = newLeft + "px";
        div.style.top = newTop + "px";
      };

      // div.onmouseleave = function () {
      window.onmouseup = window.onmouseleave = function () {
        window.onmousemove = null;
      };
    };

    /**
     * 得到可移动的div
     */
    function getMoveDiv(dom) {
      // if (dom.className === "paper" && dom.tagName === "DIV") {
      if (dom.className === "paper") {
        return dom;
      } else if (
        dom.parentElement &&
        dom.parentElement.className === "paper" &&
        dom.tagName === "P"
      ) {
        return dom.parentElement;
      }
    }
  }

  /**
   * 创建一个许愿墙
   * @param {*} words
   */
  function createWish(words) {
    var div = document.createElement("div");
    div.className = "paper";
    div.innerHTML = `${words}<span class="close">X</span>`;

    // 视口宽高，不包含滚动条
    var maxWidth = document.documentElement.clientWidth - paperWidth;
    var maxHeight = document.documentElement.clientHeight - paperHeight - 80;

    div.style.left = getRandom(0, maxWidth) + "px";
    div.style.top = getRandom(0, maxHeight) + "px";
    div.style.background = `rgb(${getRandom(100, 200)}, ${getRandom(
      100,
      200
    )}, ${getRandom(100, 200)})`;

    doms.hopeContainer.appendChild(div);

    /**
     * 得到一个最小值到最大值之间的随机整数（取得到最大值）
     * @param {*} min
     * @param {*} max
     * @returns
     */
    function getRandom(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  }

  /**
   * 初始化form回车事件
   */
  function sendWish() {
    // keypress（按下之后会有反馈效果）
    doms.input.onkeypress = function (e) {
      if (e.key === "Enter") {
        if (this.value) {
          createWish(this.value);
          this.value = "";
        }
      }
    };
  }

  /**
   * 关闭许愿墙
   */
  function closeEvent() {
    // 用事件委托
    doms.hopeContainer.onclick = function (e) {
      // if (e.target.className === "close") {
      if (
        e.target.parentElement &&
        e.target.parentElement.className === "paper" &&
        e.target.tagName === "SPAN"
      ) {
        // doms.hopeContainer.removeChild(e.target.parentElement);
        e.target.parentElement.remove(); // 自杀
      }
    };
  }
})();

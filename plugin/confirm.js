// 会污染全局变量
/* 
function openConfirm() {
  initModal();
}
  
function initModal() {
  var divModal = document.createElement("divModal");
  divModal.style.width = "100%";
  divModal.style.height = "100%";
  divModal.style.position = "fixed";
  divModal.style.left = 0;
  divModal.style.top = 0;
  divModal.style.background = "rgba(0,0,0,.2)";
  document.body.appendChild(divModal);

  // var subDivModal = document.createElement("divModal");

} */

// 不污染污染全局变量写法一：
/* function openConfirm() {
  initModal();

  function initModal() {
    var divModal = document.createElement("divModal");
    divModal.style.width = "100%";
    divModal.style.height = "100%";
    divModal.style.position = "fixed";
    divModal.style.left = 0;
    divModal.style.top = 0;
    divModal.style.background = "rgba(0,0,0,.2)";
    document.body.appendChild(divModal);
  }
} */

// 不污染污染全局变量写法二：
/* var openConfirm = (function () {
  function openConfirm() {
    initModal();
  }

  function initModal() {
    var divModal = document.createElement("divModal");
    divModal.style.width = "100%";
    divModal.style.height = "100%";
    divModal.style.position = "fixed";
    divModal.style.left = 0;
    divModal.style.top = 0;
    divModal.style.background = "rgba(0,0,0,.2)";
    document.body.appendChild(divModal);
  }

  return openConfirm;
})(); */

// 不污染污染全局变量写法三：
// window.myPlugin = {};
if (!window.myPlugin) {
  // 没有才赋值，这样不会覆盖原有的
  window.myPlugin = {};
}

window.myPlugin.openConfirm = (function () {
  var divModal, // 遮罩层
    divCenter, // 中间的div容器
    options,
    spanTitle,
    spanClose,
    divContent,
    btnConfirm,
    btnCancel,
    isregEvent = false; // 是否注册过事件

  function openConfirm(opts) {
    if (typeof opts === "string") {
      /* options = {
        content: opts,
      }; */
      // 统一都给opts赋值
      opts = {
        content: opts,
      };
    } /*  else {
      options = opts;
    } 
    if (!options) {
      // 防止报错
      options = {};
    }*/
    // 统一都给opts赋值
    if (!opts) {
      // 防止报错
      opts = {};
    }
    options = opts;

    initModal();
    initCenterDiv();
    regEvent();
  }

  /**
   * 注册事件
   */
  function regEvent() {
    if (isregEvent) {
      return;
    }
    spanClose.onclick = function () {
      divModal.style.display = "none";
    };

    btnConfirm.onclick = function () {
      // 确定之后不知道要干嘛——》回调（事件的本质就是回调）
      // options.onConfirm();
      // 做个判断，防止没穿的时候报错
      if (options.onConfirm) {
        options.onConfirm();
      }
      divModal.style.display = "none";
    };

    btnCancel.onclick = function () {
      // 确定之后不知道要干嘛——》回调（事件的本质就是回调）
      // options.onCancel();
      // 做个判断，防止没穿的时候报错
      if (options.onCancel) {
        options.onCancel();
      }
      divModal.style.display = "none";
    };

    isregEvent = true;
  }

  /**
   * 初始化中间的div
   */
  function initCenterDiv() {
    if (!divCenter) {
      divCenter = document.createElement("div");
      divCenter.style.width = "260px";
      divCenter.style.height = "160px";
      divCenter.style.background = "#fff";
      // 需要是定位下的居中
      divCenter.style.position = "absolute";
      divCenter.style.left =
        divCenter.style.right =
        divCenter.style.top =
        divCenter.style.bottom =
          0;
      divCenter.style.margin = "auto";
      // 统一设置文本大小
      divCenter.style.fontSize = "14px";
      initDivCenterContent();

      divModal.appendChild(divCenter);

      // 获取dom在这里就不用重复获取
      /* spanTitle = document.querySelector('[data-my-plugin-id="title"]');
      spanClose = document.querySelector('[data-my-plugin-id="close"]');
      divContent = document.querySelector('[data-my-plugin-id="content"]');
      btnConfirm = document.querySelector('[data-my-plugin-id="confirm"]');
      btnCancel = document.querySelector('[data-my-plugin-id="cancel"]'); */
      // 可以缩小范围查找
      spanTitle = divCenter.querySelector('[data-my-plugin-id="title"]');
      spanClose = divCenter.querySelector('[data-my-plugin-id="close"]');
      divContent = divCenter.querySelector('[data-my-plugin-id="content"]');
      btnConfirm = divCenter.querySelector('[data-my-plugin-id="confirm"]');
      btnCancel = divCenter.querySelector('[data-my-plugin-id="cancel"]');
    }

    // 设置配置的内容。每次打开需要更新配置文本内容，所以写在这里
    // document.querySelector('[myplugin-id="title"]');
    // spanTitle.innerText = options.title ? options.title : "提示";
    // 上面一行等价于
    spanTitle.innerText = options.title || "提示";

    divContent.innerText = options.content || "默认内容文本";

    btnConfirm.innerText = options.confirmText || "确定";
    btnConfirm.className = options.confirmClass || "";

    btnCancel.innerText = options.cancelText || "取消";
    btnCancel.className = options.cancelClass || "";
  }

  /**
   * 初始化三个div的内容
   */
  function initDivCenterContent() {
    // 头部：创建内部的标题div
    var div = document.createElement("div");
    div.style.height = "40px";
    div.style.background = "#eeeeee";
    div.innerHTML = `
        <span data-my-plugin-id="title" style="float: left"></span>
        <span data-my-plugin-id="close" style="float: right; cursor: pointer">
            <img style="width: 18px; height: 18px" src="data:image/png;base64,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" />
        </span>
    `;
    // div.style.lineHeight = "40px";
    div.style.padding = "10px 20px 0";
    div.style.boxSizing = "border-box";

    divCenter.appendChild(div);

    // 内容：创建提示文本div
    div = document.createElement("div");
    div.style.height = "70px";
    div.style.padding = "20px";
    div.innerHTML = options.content;
    // 文本需要可配置
    // div.innerHTML = "123吧啦";
    div.style.boxSizing = "border-box";
    div.dataset.myPluginId = "content";

    divCenter.appendChild(div);

    // 底部按钮：创建按钮div
    div = document.createElement("div");
    div.style.padding = "10px 20px";
    // div.style.height = "50px";
    // 此处不需要浮动，因为按钮是行内元素
    div.style.textAlign = "right";
    /* div.innerHTML = `
        <button>确定</button>
        <button>取消</button>
    `; */
    // 文本需要可配置
    /* div.innerHTML = `
        <button>${options.confirmText}</button>
        <button>${options.cancelText}</button>
    `; */
    // 还要考虑每次更新文本内容
    div.innerHTML = `
        <button data-my-plugin-id="confirm"></button>
        <button data-my-plugin-id="cancel"></button>
    `;

    div.style.boxSizing = "border-box";

    divCenter.appendChild(div);
  }

  /**
   * 初始化蒙层
   */
  function initModal() {
    /* if (divModal) {
      // 不做判断会导致创建很多的div
      return;
    } */
    if (!divModal) {
      divModal = document.createElement("div");
      divModal.style.width = "100%";
      divModal.style.height = "100%";
      divModal.style.position = "fixed";
      /* divModal.style.left = 0;
    divModal.style.top = 0; */
      // 可以连等
      divModal.style.left = divModal.style.top = 0;
      divModal.style.background = "rgba(0,0,0,.2)";
      divModal.style.boxSizing = "border-box";

      document.body.appendChild(divModal);
    }
    divModal.style.display = "block";
  }

  return openConfirm;
})();

/**
 * 打开一个确认对话框
 */

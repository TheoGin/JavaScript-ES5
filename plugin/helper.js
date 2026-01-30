/* if (!window.myPlugin) {
 window.myPlugin = {};
 } */
// 继承可能不是在浏览器，就没有window对象，为了通用性，把window改为this
if (!this.myPlugin) {
  this.myPlugin = {};
}

this.myPlugin.inherit = function (son, father) {
  // ES5之前没有Object.create的写法
  var Temp = function () {
  };
  Temp.prototype = father.prototype;
  son.prototype = new Temp();

  // son.prototype = father.prototype; // 不推荐，会造成原型污染
  // son.prototype = Object.create(father.prototype);

  // son.prototype.constructor = father; // 错误写法
  // 需要让constructor是自己的，而不是找原型链上的
  son.prototype.constructor = son;

  // 可以通过Object.getPrototypeOf(对象)获取对象的隐式原型。
  // 圣杯模式：为了操作方便，给子类原型加一个属性：uber 等价于是 super（关键字）
  // son.prototype.uber = father.prototype;

  // 10.2.2.2.1 一种方便操作的写法
  // son.prototype.uber = father;
};
/* this.myPlugin.inherit = (function () {
 // ES5之前没有Object.create的写法
 var Temp = function () {};
 return function (son, father) {
 Temp.prototype = father.prototype;
 son.prototype = new Temp();

 son.prototype.constructor = son;
 son.prototype.uber = father.prototype;
 };
 })(); */

/**
 * 将 obj2 混合到 obj1 并产生新的对象
 * @param obj1
 * @param obj2
 * @returns {Object}
 */
this.myPlugin.mixin = function (obj1, obj2) {
  /* var newObj = {};

   // 思路1：
   // 1.1 先复制 obj1 的属性到 newObj
   for (var prop in obj1) {
   newObj[prop] = obj1[prop];
   }

   // 1.2 再复制 obj2 的属性到 newObj，原先有的就覆盖，没有就新增
   for (const prop in obj2) {
   newObj[prop] = obj2[prop];
   }

   // 参考：先复制 obj2，再找到obj1中有但是obj2中没有的属性
   for (const prop in obj2) {
   newObj[prop] = obj2[prop];
   }

   for (var prop in obj1) {
   if (!(prop in newObj)) {
   newObj[prop] = obj1[prop];
   }
   }

   return newObj;
   */
  return Object.assign({}, obj1, obj2);
};

/**
 * 克隆一个对象
 * @param data
 * @param {boolean} deep 是否深度克隆
 * @returns {{}|*|*[]}
 */
this.myPlugin.clone = function (data, deep = false) {
  if (Array.isArray(data)) {
    if (deep) {
      // 深度克隆
      const newArr = [];
      for (var i = 0; i < data.length; i++) {
        newArr[i] = this.clone(data[i], deep);
      }
      return newArr;
    } else {
      return data.slice(); //复制数组
    }
  } else if (typeof data === "object" && typeof data !== null) {
    var newObj = {};
    for (const prop in data) {
      if (deep) {
        newObj[prop] = this.clone(data[prop], deep);
      } else {
        newObj[prop] = data[prop];
      }
    }
    return newObj;
  } else {
    // 函数、原始类型直接返回（递归出口）
    return data; //递归的终止条件
  }
};

/**
 * 函数防抖
 * @param callback
 * @param timeout
 * @returns {(function(): void)|*}
 */
this.myPlugin.debounce = function (callback, timeout) {
  var timer; // 不定义在外面，防止污染全局变量
  return function () {
    var args = arguments;  // 利用闭包保存参数数组
    clearTimeout(timer); // 清除之前的计时
    timer = setTimeout(function () {
      // 这里的 arguments 是里面函数的，而不是外层的
      callback.apply(null, args);
    }, timeout);
  };
};

/**
 * 函数节流
 * @param callback
 * @param timeout
 * @param immmediate
 * @returns {(function(): void)|*}
 */
this.myPlugin.throttle = function (callback, timeout, immmediate = true) {
  if (immmediate) {
    var timerstamp;
    return function () {
      // !timerstamp：第一次立即执行
      if (!timerstamp || Date.now() - timerstamp >= timeout) { // 之前没有计时 或 距离上次执行的时间已超过规定的值
        timerstamp = Date.now(); // 得到的当前时间戳
        callback.apply(null, arguments);
      }
    };
  }

  var timer;
   return function () {
   if (timer) {
   return;
   }
   var args = arguments;  // 利用闭包保存参数数组

   timer = setTimeout(function () {
   callback.apply(null, args);
   timer = null;
   }, timeout);
   };
};
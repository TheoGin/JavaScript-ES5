/* if (!window.myPlugin) {
  window.myPlugin = {};
} */
// 继承可能不是在浏览器，就没有window对象，为了通用性，把window改为this
if (!this.myPlugin) {
  this.myPlugin = {};
}

this.myPlugin.inherit = function (son, father) {
  // ES5之前没有Object.create的写法
  var Temp = function () {};
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
typeof Node; // 'function'
Element; // ƒ Element() { [native code] }
Comment; // ƒ Comment() { [native code] }
console.dir(document.body); // 隐式原型：HTMLBodyElement ->HTMLElement -> Element -> Node -> EventTarget -> Object
var e = new MouseEvent('click') 
e // MouseEvent {isTrusted: false, screenX: 0, screenY: 0, clientX: 0, clientY: 0, …}
 // 隐式原型：MouseEvent ->UIEvent -> Event -> Object
/**
 * 手写call函数，不得使用 apply, bind辅助
 * @param {*} context
 * @param  {...any} args
 * @returns
 */
Function.prototype.myCall = function (context, ...args) {
  // 1. 第一个参数传递的可能不是对象，则要做特殊处理
  // context === null || context === undefined ? window : Object(context);
  // 1.1. 写window不好，因为node环境的全局对象不是window
  context =
    context === null || context === undefined ? globalThis : Object(context); // 其他情况用Object转为普通对象

  // this(...args); // 2. 直接调用就是window——》通过传递的对象来调用

  // 3. 通用的函数，加了一个属性，难免可能会污染——》用ES6的Symbol
  // context.fn = this;
  var key = Symbol("temp");

  // 4. 不想打印临时添加的属性？
  // context.key = this; // 错误写法，需要通过属性表达式书写
  // context[key] = this;
  Object.defineProperty(context, key, {
    enumerable: false,
    value: this, // 5. 需要把context[key] = this赋值方式改为value: this ！！！
  });

  // 6. 通过传递的对象来调用，而不是直接调用，便可以改变this指向

  // 7. 返回值要保存，然后原样返回
  const result = context[key](...args);
  delete context.fn;

  return result;
};

function method(a, b) {
  console.log(this, a, b); // {Symbol(temp): ƒ}  1  2
  return a + b;
}

method(1, 2); // Window {window: Window, self: Window, document: document, name: '', location: Location, …} 1 2
console.log(method.myCall({}, 1, 2)); // 3
// 方法内打印： {} 1 2

// 第一个参数传递的可能不是对象，则要做特殊处理
method.myCall(null, 1, 2); // Window {window: Window, self: Window, document: document, name: '', location: Location, …} 1 2
method.myCall(undefined, 1, 2); // Window {window: Window, self: Window, document: document, name: '', location: Location, …} 1 2
method.myCall("abc", 1, 2); // String {'abc'} 1 2
method.myCall(999, 1, 2); // Number {999} 1 2

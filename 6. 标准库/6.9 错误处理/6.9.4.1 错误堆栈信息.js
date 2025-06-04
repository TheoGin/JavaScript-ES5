function A() {
  B();
  console.log("a func");
}

function B() {
  C();
  console.log("b func");
}

function C() {
  throw new TypeError("类型错误");
  console.log("c func");
}

A();

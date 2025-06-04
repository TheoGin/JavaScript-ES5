function A() {
  console.log(B());

  console.log("a func");
}

function B() {
  try {
    C();
    console.log("b func"); // 不会执行
  } catch (err) {
    console.log(err);
    return 3;
  } finally {
    console.log("处理完成");
    return 5; // 后面的return会覆盖前面return的值
  }
}

function C() {
  throw new Error("错误");
  console.log("c func"); // 不会执行
}

A();

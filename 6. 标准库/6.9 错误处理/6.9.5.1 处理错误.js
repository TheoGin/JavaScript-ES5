function A() {
  B();
  console.log("a func");
}

function B() {
  try {
    C();
    console.log("b func");
  } catch (err) {
    console.log(err);
  } finally {
    console.log("处理完成");
  }
}

function C() {
  throw new Error("错误");
  console.log("c func");
}

A();

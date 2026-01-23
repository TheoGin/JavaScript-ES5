/*function A() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  }
}

A();

console.log(i);*/

/*console.time()
function A() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  }
}
console.timeEnd();

A();*/
/*
default: 0.098ms
3
3
3
* */


// 解决方案
function A() {
  for (var i = 0; i < 3; i++) {
    (function (i) {
      setTimeout(function () {
        console.log(i);
      }, 1000);
    })(i);
  }
}

A();


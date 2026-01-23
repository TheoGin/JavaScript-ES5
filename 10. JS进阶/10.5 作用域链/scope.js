var count = 100;

function A() {
  var count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

var testFn = A();

testFn();
testFn();
testFn();

console.log(count);

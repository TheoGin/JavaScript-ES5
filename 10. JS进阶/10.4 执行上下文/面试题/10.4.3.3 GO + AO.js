console.log(foo);
var foo = "A";
console.log(foo);
var foo = function () {
  console.log("B");
};
console.log(foo);
foo();

function foo() {
  console.log("C");
}

console.log(foo);
foo();

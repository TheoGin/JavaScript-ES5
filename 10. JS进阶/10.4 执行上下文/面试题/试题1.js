var foo = 1;

function bar() {
  console.log(foo);
  if (!foo) {
    var foo = 10;
  }
  console.log(foo);
}

bar();

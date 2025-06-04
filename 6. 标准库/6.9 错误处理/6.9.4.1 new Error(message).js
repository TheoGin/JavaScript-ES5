function isPrime(num) {
  if (isNaN(num)) {
    // 不是数字
    throw new Error("num必须是一个整数");
  }
  if (num < 2) {
    return false;
  }
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
// console.log(isPrime("abc"));
/* 
prime.js:3 Uncaught Error: num必须是一个整数
    at isPrime (prime.js:3:11)
    at prime.js:15:13
    isPrime	@	prime.js:3
    (anonymous)	@	prime.js:15
*/

var error = new Error("error");
// console.dir(对象)：查看对象的内部结构
console.dir(error);

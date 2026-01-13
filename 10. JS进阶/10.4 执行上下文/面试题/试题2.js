var a = 1;
function b() {
    console.log(a);
    a = 10;
    return;
    function a() { }
}
b();
console.log(a);

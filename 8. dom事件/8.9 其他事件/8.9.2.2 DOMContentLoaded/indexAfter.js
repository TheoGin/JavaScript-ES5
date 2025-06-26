// document的DOMContentLoaded（只能通过addEventListener监听；JQuery里叫ready事件）: dom树构建完成后发生
document.addEventListener("DOMContentLoaded", function () {
  console.log("dom树构建完毕");
  var img = document.querySelector("img");
  getImageSize(img, function (size) {
    console.log(size);
  });
});

function getImageSize(img, callback) {
  console.log(img.width, img.height); // 0 0

  if (img.width === 0 && img.height === 0) {
    img.onload = function () {
      /* // 用return不能返回到getImageSize函数 ——》用回调
      return {
        width: img.width,
        height: img.height
      } */
      callback({
        width: img.width,
        height: img.height,
      });
    };
  } else {
    callback({
      width: img.width,
      height: img.height,
    });
  }
}

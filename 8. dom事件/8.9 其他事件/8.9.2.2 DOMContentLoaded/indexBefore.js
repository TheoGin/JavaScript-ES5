var img = document.querySelector("img");
console.log(img); // null，因为script写在了元素的前面

// window的load：页面中所有资源全部加载完毕的事件
window.onload = function () {
  console.log("全部加载完毕");

  var img = document.querySelector("img");
  console.log(img); // <img src="https://img2.baidu.com/it/u=2475750251,2922839412&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=515" alt="">

  console.log(img.width, img.height); // 500 515
};

// load事件一般不会用在window上，会写在img、video、audio等上

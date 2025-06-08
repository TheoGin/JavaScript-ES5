var divGame = document.getElementById("game");
divGame.style.width = "500px";
divGame.style.height = "500px";
divGame.style.border = "2px solid #ccc";
divGame.style.position = "relative";

var h1 = document.querySelector("h1");

// var img = document.createElement('img')
// img.src = 'img/lol.png'
// divGame.appendChild(img)

// 500 * 500 九等分

function createDiv(position) {
  //   console.log(position);
  var div = document.createElement("div");
  div.style.width = "165px";
  div.style.height = "165px";
  var src = "url(img/lol.png)";
  div.style.backgroundImage = src;
  div.style.backgroundPosition = `${position.x}px ${position.y}px `;
  div.style.border = "1px solid #fff";
  div.style.cursor = "pointer";
  div.style.boxSizing = "border-box";
  // div.style.float = "left";
  div.style.position = "absolute";
  return div;
}

var imgs = [];
var positions = [];
var size = parseInt(500 / 3);
for (var i = 0; i < size * 3; i += size) {
  for (var j = 0; j < size * 3; j += size) {
    // console.log(i, j);
    if (i === size && j === size) {
      //   console.log(i, j); // 166.66666666666666 166.66666666666666
      continue;
    }
    imgs.push(createDiv({ x: i, y: j }));
  }
}
for (var i = 0; i < size * 3; i += size) {
  for (var j = 0; j < size * 3; j += size) {
    if (i === size * 2 && j === size * 2) {
      continue;
    }
    console.log(i, j);
    positions.push({ x: i, y: j });
  }
}

// 打乱顺序
positions.sort(function () {
  return Math.random() - 0.5;
});

// 空白位置
var space = {
  // 333.333
  x: size * 2,
  y: size * 2,
};

var i = 0;
positions.forEach(function (position) {
  // console.log(imgs[i], position.x);
  imgs[i].style.top = position.y + "px";
  imgs[i].style.left = position.x + "px";
  i++;
});

var frag = document.createDocumentFragment();
imgs.forEach(function (img) {
  img.onclick = function () {
    var top = parseInt(this.style.top);
    var left = parseInt(this.style.left);
    // console.log(top);
    // console.log(left);
    /* if (
      (top === space.x && left + size === space.y) ||
      (top + size === space.y && left === space.x) ||
      (top === space.x && left - size === space.y) ||
      (top - size === space.y && left === space.x)
    ) { */
    if (
      top + left + size === space.x + space.y ||
      top + left - size === space.x + space.y
    ) {
      var tmp = { x: left, y: top };
      this.style.left = space.x + "px";
      this.style.top = space.y + "px";
      space = tmp;
    }
    if (isFinish()) {
      h1.innerHTML = "德玛西亚！！！";
    }
  };
  frag.appendChild(img);
});
divGame.appendChild(frag);

function isFinish() {
  var cnt = 0;
  imgs.forEach(function (img) {
    var top = parseInt(img.style.top);
    var left = parseInt(img.style.left);
    var x = parseInt(img.style.backgroundPositionX);
    var y = parseInt(img.style.backgroundPositionY);
    console.log(top);
    console.log(left);
    console.log(x);
    console.log(y);
    console.log("---------------");
    if (left === x && top === y) {
      cnt++;
    }
  });
  console.log(cnt);

  if (cnt === 8) {
    return true;
  } else {
    return false;
  }
}

if (isFinish()) {
  h1.innerHTML = "德玛西亚！！！";
}

// 新建一个BetterFunction.js, 将之前的MyFunction.js改造成为单对象模式。
// 可以避免污染全局函数名
var MyFunctions = {
  // 新建一个js文件，编写以下函数
  // 1. 写一个函数，该函数用于判断某个数是不是奇数
  // 函数名参考：isOdd

  /**
   * 判断某个数是不是奇数
   * @param {number} num是一个数字
   * @returns {boolean}
   */
  isOdd: function (num) {
    /* if (num % 2 !== 0) {
        return true;
    }
    return false; 
  */
    // 简写
    return num % 2 !== 0;
  },

  // 2. 写一个函数，该函数用于判断某个数是不是素数
  // 函数名参考：isPrime

  /**
   * 判断某个数是不是素数
   * @param {number} num是一个数字
   * @returns
   */
  isPrime: function (num) {
    if (num < 2) {
      return false;
    }

    for (var i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  },

  // 3. 写一个函数，该函数用于对数组求和
  // 函数名参考：sumOfArray
  /**
   * 用于对数组求和
   * @param {Array} arr是一个数组
   * @returns {number}
   */
  sumOfArray: function (arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  },

  // 4. 写一个函数，该函数用于得到数组中的最大值
  // 函数名参考：maxOfArray
  /**
   * 用于得到数组中的最大值，如果数组长度为0，返回undefined
   * @param {Array} arr是一个数组
   * @returns { boolean | undefined }
   */
  maxOfArray: function (arr) {
    if (arr.length === 0) {
      return; // 不写默认返回undefined
    }
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  },

  // 5. 写一个函数，该函数用于得到数组中的最小值
  // 函数名参考：minOfArray
  /**
   * 用于得到数组中的最大值，如果数组长度为0，返回undefined
   * @param {Array} arr是一个数组
   * @returns { boolean | undefined }
   */
  minOfArray: function (arr) {
    if (arr.length === 0) {
      return; // 不写默认返回undefined
    }
    var min = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    return min;
  },

  // 6. 写一个函数，该函数用于判断数组是否是稀松数组
  // 函数名参考：hasEmptyInArray
  /**
   * 用于判断数组是否是稀松数组，如果数组长度为0，返回undefined
   * @param {Array} arr是一个数组
   */
  hasEmptyInArray: function (arr) {
    /* if(arr.length === 0) {
        return;
    }
    for(var i = 0; i < arr.length; i++) {
        if(!arr[i]) {
            return true;
        }
    }
    return false; */

    // 稀松数组：下标连续
    for (var i = 0; i < arr.length; i++) {
      if (!(i in arr)) {
        return true;
      }
    }
    return false;
  },

  // 7. 写一个函数，判断该某年是否是闰年
  // 函数名参考：isLeap
  /**
   * 判断该某年是否是闰年
   * @param {number} year
   */
  isLeap: function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },

  // 8. 写一个函数，得到某年某月的天数
  // 函数名参考：getDays
  /**
   * 得到某年某月的天数
   * @param {number} year
   * @param {number} month
   */
  getDays: function (year, month) {
    /* var days = [, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeap(year)) {
    days[month] = 29;
  }
//   console.log(days);
  return days[month]; */

    if (month === 2) {
      return this.isLeap(year) ? 29 : 28;
    } else if (
      (month < 8 && this.isOdd(month)) ||
      (month >= 8 && !this.isOdd(month))
    ) {
      //  month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12
      /* 
     - month < 8        1, 3, 5, 7
     - month >= 8       8, 10, 12
    */
      return 31;
    } else {
      return 30;
    }
  },

  // 9. 写一个函数，得到某个数字或字符数组中出现次数最多的数字和频率
  // 函数名参考：getTopFreqInArray
  /**
   * 得到某个数字数组中出现次数最多的数字和频率
   * @param {Array} arr 数字数组
   */
  getTopFreqInArray: function (arr) {
    /**
     * 2: 2
     * 4: 1
     * 6: 1
     * 1: 1
     * 34: 1
     */
    var records = {}; //记录出现频率
    // var isNumber = false;
    for (var i = 0; i < arr.length; i++) {
      var num = arr[i];
      // if(typeof num === 'number') {
      //   isNumber = true;
      // }
      // if(num in records) {
      if (records[num]) {
        records[num]++;
      } else {
        records[num] = 1;
      }
    }

    var result; //记录最终结果的对象
    for (var prop in records) {
      if (!result || records[prop] > result.frequency) {
        result = {
          // number: isNumber? +prop : prop, // 数字转换为数字，字符串就不转换
          number: prop,
          frequency: records[prop],
        };
      }
    }
    return result;
  },

  /* 5.5.2 写一个函数，为数组排序sort。要考虑到这个数组的所有可能（需要传回调）
    [324,,76,56,345,34,45,45]
    ["asfas","fgf","asdfasdf"]
    [{name:"asdfasdf",age:"asdfasd"},{name:"asdfasf",age:33)]
 */
  /**
   * 判断数据是否为对象
   * @param {*} data
   */
  /* isObject: function (data) {
    return typeof data === "object" && data !== null;
  }, */
  /**
   * 冒泡排序
   * @param {*} arr
   */
  /* bubbleSort: function (arr) {
    for (var i = 1; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i; j++) {
        if (arr[j + 1] < arr[j]) {
          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },
  bubbleObjectSort: function (arr, prop = "name") {
    for (var i = 1; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i; j++) {
        if (arr[j + 1][prop] < arr[j][prop]) {
          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  }, */

  /**
   * 为数组排序，数组长度为0时，返回undefined
   * @param {*} arr 数组
   */
  /* sort: function (arr, prop = 'name') {
    if (arr.length === 0) {
      return;
    }
    if (this.isObject(arr[0])) {
      this.bubbleObjectSort(arr, prop);
    } else {
      this.bubbleSort(arr);
    }
  }, */
  /**
   * 为数组排序
   * @param {Array} arr 数组
   * @param {Function} compareFn 定义排序顺序的函数。返回值应该是一个数字，其符号表示两个元素的相对顺序
   * 第一个数减去第二个数，大于0，返回正数
   * 第一个数减去第二个数，等于0，返回0
   * 第一个数减去第二个数，小于0，返回负数
   */
  sort: function (arr, compareFn) {
    /* 
    if (
        compareFn === undefined
          ? function (o1, o2) {
              return o1 > o2;
            }
          : compareFn(arr[j], arr[j + 1]) > 0
      ) 
    */
    // 没传第二个参数的情况
    if (!compareFn) {
      compareFn = function (o1, o2) {
        // return o1 > o2;
        if (o1 > o2) {
          return 1;
        } else if (o1 === o2) {
          return 0;
        } else {
          return -1;
        }
      };
    }
    console.log(arr);

    for (var i = 1; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i; j++) {
        // console.log(compareFn(arr[j], arr[j+1]));
        //比较arr[j] 和 arr[j+1]
        if (compareFn(arr[j], arr[j + 1]) > 0) {
          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },

  // 5.5.3 写一个函数，按照指定的条件对某个数组进行筛选 filter
  /**
   * 按照指定的条件对某个数组进行筛选
   * @param {Array} arr 数组
   * @param {Function} conditionFn 回调函数，接收两个参数（一个数据项和一个下标），返回一个布尔值
   * @returns 返回新数组
   */
  filter: function (arr, conditionFn) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (conditionFn(arr[i], i)) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },

  // 5.5.4 写一个函数，按照指定的条件，得到某个数组中第一个满足条件的元素 find。否则返回 undefined。
  /**
   * find() 方法返回数组中满足提供的测试函数的第一个元素的值
   * @param {*} arr
   * @param {Function} conditionFn 回调函数，接收两个参数（一个数据项和一个下标），返回一个元素
   */
  find: function (arr, conditionFn) {
    for (var i = 0; i < arr.length; i++) {
      if (conditionFn(arr[i], i)) {
        return arr[i];
      }
    }
    // return undefined;
    // return;
    // 不写return，默认返回undefined
  },

  // 5.5.5 写一个函数，按照指定的条件，得到某个数组中满足条件的元素数量 count
  /**
   * 按照指定的条件，得到某个数组中满足条件的元素数量 count
   * @param {*} arr
   * @param {Function} conditionFn 回调函数，接收两个参数（一个数据项和一个下标），没有满足条件的返回0
   */
  count: function (arr, conditionFn) {
    var cnt = 0;
    for (var i = 0; i < arr.length; i++) {
      if (conditionFn(arr[i], i)) {
        cnt++;
      }
    }
    return cnt;
  },
  /**
   * 得到一个最小值到最大值之间的随机整数
   * @param {number} min 最小值
   * @param {number} max 最大值（取不到最大值）
   */
  /* getRandom(min, max) {
    // return min + Number.parseInt(Math.random() * (max - min));
    // 或者括号括一整个
    return parseInt(Math.random() * (max - min) + min);
  }, */
  /**
   * 得到一个最小值到最大值之间的随机整数
   * @param {number} min 最小值
   * @param {number} max 最大值（取得到最大值）
   */
  getRandom(min, max) {
    /* 
    正数：
      Math.random()               0 ~ 1
      Math.random() * 10          0 ~ 10
      5 + Math.random() * 10      5 ~ 15  
    min = 5, max = 15时，5 + Math.random() * 10 ---> min + Math.random() * (max - min)
    负数：
      0 ~ -3   -5 ~ -3
      假如是-3.14, parseInt(-3.14)得到的是-3，而取不到最大值-3，就出问题了，而正数是取不到最大值 ---> Math.floor
    */
    // return (min > 0 ? min - 1 : 0) + Number.parseInt(Math.random() * (max + 1)); // 错误写法
    // return min + Number.parseInt(Math.random() * (max + 1 - min));
    // 或者括号括一整个
    // return parseInt(min + Math.random() * (max + 1 - min));
    return Math.floor(min + Math.random() * (max + 1 - min)); // +1是为了取到最大值
  },
  /**
   * 获取符串中只能包含大写字母、小写字母、数字
   * @returns 
   */
   /* getUpperAndLowerAlphabetAndNumStr() {
    var str = "";
    for (var i = 65; i < 65 + 26; i++) {
      str += String.fromCharCode(i);
    }
    for (var i = 97; i < 97 + 26; i++) {
      str += String.fromCharCode(i);
    }
    for (var i = 0; i <= 9; i++) {
      str += "" + i;
    }
    return str;// ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
  }, */

  // 书写一个函数，产生一个指定长度的随机字符串，字符串中只能包含大写字母、小写字母、数字
  /**
   * 产生一个指定长度的随机字符串，字符串中只能包含大写字母、小写字母、数字
   * @param {*} len 指定长度
   */
  /* getRandomStr(len) {
    var str = this.getUpperAndLowerAlphabetAndNumStr();
    // var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var resultStr = "";
    for (var i = 0; i < len; i++) {
      resultStr += str[this.getRandom(0, str.length - 1)];
    }
    return resultStr;
  }, */
};
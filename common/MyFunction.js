// 新建一个js文件，编写以下函数
// 1. 写一个函数，该函数用于判断某个数是不是奇数
// 函数名参考：isOdd

/**
 * 判断某个数是不是奇数
 * @param {number} num是一个数字
 * @returns {boolean}
 */
function isOdd(num) {
  /* if (num % 2 !== 0) {
        return true;
    }
    return false; 
  */
  // 简写
  return num % 2 !== 0;
}

// 2. 写一个函数，该函数用于判断某个数是不是素数
// 函数名参考：isPrime

/**
 * 判断某个数是不是素数
 * @param {number} num是一个数字
 * @returns
 */
function isPrime(num) {
  if (num < 2) {
    return false;
  }

  for (var i = 2; i < num; i++) {
    if (num % 2 === 0) {
      return false;
    }
  }
  return true;
}

// 3. 写一个函数，该函数用于对数组求和
// 函数名参考：sumOfArray
/**
 * 用于对数组求和
 * @param {Array} arr是一个数组
 * @returns {number}
 */
function sumOfArray(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// 4. 写一个函数，该函数用于得到数组中的最大值
// 函数名参考：maxOfArray
/**
 * 用于得到数组中的最大值，如果数组长度为0，返回undefined
 * @param {Array} arr是一个数组
 * @returns { boolean | undefined }
 */
function maxOfArray(arr) {
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
}

// 5. 写一个函数，该函数用于得到数组中的最小值
// 函数名参考：minOfArray
/**
 * 用于得到数组中的最大值，如果数组长度为0，返回undefined
 * @param {Array} arr是一个数组
 * @returns { boolean | undefined }
 */
function minOfArray(arr) {
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
}

// 6. 写一个函数，该函数用于判断数组是否是稀松数组
// 函数名参考：hasEmptyInArray
/**
 * 用于判断数组是否是稀松数组，如果数组长度为0，返回undefined
 * @param {Array} arr是一个数组
 */
function hasEmptyInArray(arr) {
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
}

// 7. 写一个函数，判断该某年是否是闰年
// 函数名参考：isLeap
/**
 * 判断该某年是否是闰年
 * @param {number} year
 */
function isLeap(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// 8. 写一个函数，得到某年某月的天数
// 函数名参考：getDays
/**
 * 得到某年某月的天数
 * @param {number} year
 * @param {number} month
 */
function getDays(year, month) {
  /* var days = [, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeap(year)) {
    days[month] = 29;
  }
//   console.log(days);
  return days[month]; */

  if (month === 2) {
    return isLeap(year) ? 29 : 28;
  } else if ((month < 8 && isOdd(month)) || (month >= 8 && !isOdd(month))) {
    //  month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12
    /* 
     - month < 8        1, 3, 5, 7
     - month >= 8       8, 10, 12
    */
    return 31;
  } else {
    return 30;
  }
}

// 9. 写一个函数，得到某个数字数组中出现次数最多的数字和频率
// 函数名参考：getTopFreqInArray
/**
 * 得到某个数字数组中出现次数最多的数字和频率
 * @param {Array} arr 数字数组
 */
function getTopFreqInArray(arr) {
  /**
   * 2: 2
   * 4: 1
   * 6: 1
   * 1: 1
   * 34: 1
   */
  var records = {}; //记录出现频率
  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
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
        number: +prop,
        frequency: records[prop],
      };
    }
  }
  return result;
}

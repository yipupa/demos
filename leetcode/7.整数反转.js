/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */

 /**
 * 
 * @method  {1} 
 */
// var reverse = function(x) {
//     let num;
//     if (x >= 0) {
//         num = +(`${x}`.split('').reverse().join(''));  
//     } else {
//         num = -(`${x}`.slice(1).split('').reverse().join(''));
//     }
//     if (num > Math.pow(2, 31) - 1 || num < -Math.pow(2, 31)) {
//         num = 0;
//     }
//     return num;
// };

// 1032/1032 cases passed (88 ms)
// Your runtime beats 89.22 % of javascript submissions
// Your memory usage beats 28.9 % of javascript submissions (35.9 MB)

 /**
 * 
 * @method  {2} 
 */
var reverse = function(x) {
    let y = 0;
    while(x) {
        y = y * 10 + x % 10;
        x = x / 10 >> 0;
    }
    if (y > Math.pow(2, 31) - 1 || y < -Math.pow(2, 31)) {
        y = 0;
    }
    return y;
};

// 1032/1032 cases passed (84 ms)
// Your runtime beats 93.73 % of javascript submissions
// Your memory usage beats 89.45 % of javascript submissions (35.4 MB)




// @lc code=end


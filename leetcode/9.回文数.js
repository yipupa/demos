/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */

/**
 * 
 * @method  {1} 
 */
// var isPalindrome = function(x) {
//     return x === +`${x}`.split('').reverse().join('');
// };
// var isPalindrome = function(x) {
//     x = `${x}`;
//     for (let i = 0; i < x.length; i++) {
//         if (x.charAt(i) !== x.charAt(x.length - 1 - i)) {
//             return false;
//         }
//     }
//     return true;
// };
var isPalindrome = function (x) {
    if (x < 0) {
        return false;
    }
    let a = x;
    let b = 0;
    while (a) {
        b = b * 10 + a % 10;
        a = a / 10 >> 0;
    }
    return x === b;
};
// @lc code=end


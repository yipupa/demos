/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */

/**
 * 
 * @method {1} 
 */
var longestCommonPrefix = function(strs) {
    let str = '';
    if (strs.length === 1) {
        str = strs[0];
    } else if ( (strs.length > 1) ) {
        for (let i = 1; i <= strs[0].length; i++) {
            const s = strs[0].slice(0, i);
            const reg = new RegExp(`^${s}`);
            if (strs.every(st => reg.test(st))){
                str = s;
            } else {
                break;
            }
        }
    }
    return str;
};
// @lc code=end


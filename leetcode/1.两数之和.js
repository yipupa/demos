/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let list;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                list = [i, j];
            }
        }
    }
    return list;
};

// 29/29 cases passed (160 ms)
// Your runtime beats 43.14 % of javascript submissions
// Your memory usage beats 52.62 % of javascript submissions (34.6 MB)







// @lc code=end


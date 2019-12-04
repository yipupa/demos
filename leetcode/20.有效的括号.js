/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const rules = [
        {
            left: '(',
            right: ')'
        },
        {
            left: '[',
            right: ']'
        },
        {
            left: '{',
            right: '}'
        }
    ];
    if (!s.length) {
        return true;
    } else if (s.length === 1) {
        return false;
    } else {
        let sArr = s.split('');
        if (rules.some(rule => rule.right === sArr[0])) {
            return false;
        } else {
            let index = 0;
            while(sArr.length >= 2) {
                let letterLeft = sArr[index];
                const ruleRight = rules.find(rule => rule.left === letterLeft).right;
                if (sArr[index + 1] && sArr[index + 1] === ruleRight) {
                    sArr.splice(index, 2);
                } else {
                    index++;
                }
            }

            if (sArr.length === 0) {
                return true;
            } else {
                return false;
            }
            
        }
    }
};
// @lc code=end


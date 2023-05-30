/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 臭宝最近忙的都不理我
let maxSlidingWindow = function (nums, k) {
  let left = 0;
  let result = [];
  while (left + k - 1 < nums.length) {
    let max = nums[left];
    for (let i = left + 1; i < left + k; i++) {
      if (nums[i] > max) {
        max = nums[i];
      }
    }
    result.push(max);
    left += 1;
  }
  return result;
};
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

const sum = (...nums) =>
  nums.reduce((acc, v) => {
    const n = Number(v);
    return Number.isFinite(n) ? acc + n : acc;
  }, 0);

const avg = (...nums) => {
  const valid = nums
    .map(Number)
    .filter(n => Number.isFinite(n));
  if (valid.length === 0) return 0;
  const mean = valid.reduce((a, b) => a + b, 0) / valid.length;
  return mean.toFixed(2); 
};

console.log("sum(1,2,3)      =", sum(1, 2, 3));
console.log("sum(1,'x',4)    =", sum(1, "x", 4));
console.log("avg(1,2,3,4)    =", avg(1, 2, 3, 4));
console.log("avg()           =", avg());
const ages2 = [33, 12, 20, 16]; 
const [first, , third = 0, ...restAges] = ages2;

console.log("first:", first);
console.log("third:", third);
console.log("restAges:", restAges);
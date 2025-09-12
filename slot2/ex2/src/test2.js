// src/test2.js

// 1) Mảng số nguyên
export const numbers = [1,2,3,4,5,6,7,8,9,10];

// Duyệt qua mảng (3 cách)
export function loopWithFor(arr = numbers) {
  const out = [];
  for (let i = 0; i < arr.length; i++) out.push(arr[i]);
  return out;
}
export function loopWithForEach(arr = numbers) {
  const out = [];
  arr.forEach(n => out.push(n));
  return out;
}
export function loopWithMap(arr = numbers) {
  return arr.map(n => n); // map thường dùng để chuyển đổi
}

// Lọc ra các phần tử chẵn
export const evenNumbers = numbers.filter(n => n % 2 === 0);

// 3) Mảng people
export const people = [
  { id: 1, name: "An",   age: 18 },
  { id: 2, name: "Bình", age: 21 },
  { id: 3, name: "Chi",  age: 17 },
  { id: 4, name: "Dũng", age: 25 },
];

// Lọc age > 20
export const over20 = people.filter(p => p.age > 20);

// Log để xem trên console trình duyệt (tuỳ chọn)
console.log("numbers:", numbers);
console.log("for:", loopWithFor());
console.log("forEach:", loopWithForEach());
console.log("map:", loopWithMap());
console.log("evenNumbers:", evenNumbers);
console.log("people:", people);
console.log("over20:", over20);

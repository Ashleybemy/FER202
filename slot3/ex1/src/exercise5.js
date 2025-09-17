const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 12 },
  { name: "Cara", age: 15 },
  { name: "Dan", age: 22 },
  { name: "Eve", age: 13 },
];

const teens = people
  .filter(p => p.age >= 13 && p.age <= 19)
  .map(p => `${p.name} (${p.age})`);

teens.forEach(line => console.log(line));
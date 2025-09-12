let greet = (name, timeOfDay) => {
    console .log(`Good ${timeOfDay}, ${name}!`);
};
greet('Alice', 'morning');  // Good morning, Alice!
greet('Bob', 'evening');    // Good evening, Bob!

let square = num => {
    return num * num;    
};
console.log(square(3)); // 9 
console.log(square(5)); // 25

let sayHello = () => {  
    console.log('Hello!');
};
sayHello(); // Hello!

let person = {
    name: 'John',
    age: 30,
    greet: function() {  
        console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }
}; 
person.greet(); 


const result = (a, b) => a + b;
console.log(result(2, 3)); // 5
console.log(result(10, 15)); // 25
'use strict';

// Scoping

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var miilenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reassigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a miilenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(miilenial);
    // console.log(add(2, 3));
    console.log(output);
  }

  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();

// Hoisting and The TDZ

// Variables
// console.log(me);  // undefined
// console.log(job); // ReferenceError
console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3)); // 5
console.log(addExpr(2, 3)); // ReferenceError
console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

// const variable =>TDZ
const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// Example
console.log(numProducts); //undefined
// numProducts === false
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All productions deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

// this keyword

console.log(this); // Window

const calcAge = function (birthYear) {
  console.log(2037 - birthYear); //46
  console.log(this); // undefined
};
calcAge(1991);

const calcAge = birthYear => {
  console.log(2037 - birthYear); // 57
  console.log(this); // Window
};
calcAge(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this); // object
    console.log(2037 - this.year); // 46
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
matilda.calcAge();

const f = jonas.calcAge;
f(); // undefined

//
// Regular Functions vs. Arrow Functions
//

var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },

  greet: () => {
    console.log(this); // Window
    console.log(`Hey ${this.firstName}`); // Matilda
  },
};
jonas.greet();
console.log(this); // Window
console.log(this.firstName); // Undefined

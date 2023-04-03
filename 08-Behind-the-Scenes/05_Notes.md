# 05 How JavaScript Works Behind the Scenes

Execution Context

1. Variable environment
2. Scope Chain
3. `this` keyword

## Scope and The Scope Chain

Scope is the place in our code where variables are declared.

### The 3 Types of Scope

1. Global Scope:

- Outside of any function or block.
- Variables declared in global scope are accessible everywhere.

```js
const me = "Jonas";
const jog = "teacher";
const year = 1989;
```

2. Function Scope:

- Variables are accessible only inside function, NOT outside.
- Also called local scope.

```js
function calcAge(birthYear) {
  const now = 2037;
  const age = now - birthYear;
  return age;
}
```

3. Block Scope (ES6):

- Variables are accessible only inside block (block scoped).
- HOWEVER, this only applied to `let` and `const` variables!
- Functions are also block scoped (only in strick mode).

```js
if (year >= 1981 && year <= 1996) {
  const millenial = true;
  const food = "Avocado toast";
} // Example: if block, for loop block, etc.

console.log(millenial); // ReferenceError
```

### The Scope Chain

![The Scope Chain](/08-Behind-the-Scenes/img-notes/Scope_Chain_1.png)
![The Scope Chain](/08-Behind-the-Scenes/img-notes/Scope_Chain_2.png)

### The Scope Chain VS. Call Chain

![The Scope Chain VS. Call Chain](/08-Behind-the-Scenes/img-notes/Scope_Chain_Call_Stack.png)

## Scoping in Practice

```js
"use strict";

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var miilenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = "Steven";

      // Reassigning outer scope's variable
      output = "NEW OUTPUT!";

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

const firstName = "Jonas";
calcAge(1991);
// console.log(age);
// printAge();
```

## Variable Environment: Hoisting and The TDZ

Hoisting: Makes some types of variables accessible/usable in the code before they are actually declared. “Variables lifted to the top of their scope'.

![Hoisting in JavaScript](/08-Behind-the-Scenes/img-notes/Hoisting.png).

The temporal dead zone of a variable with a `let` or `const` starts from the beginning of the current scope.

![Temporal Dead Zone](/08-Behind-the-Scenes/img-notes/Temporal_Dead_Zone.png)

## Hoisting and TDZ in Practice

```js
// Variables
// console.log(me);  // undefined
// console.log(job); // ReferenceError
console.log(year);

var me = "Jonas";
let job = "teacher";
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
  console.log("All productions deleted!");
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
```

## The `this` Keyword

- `this` keyword/variable: Special variable that is created for every execution context (every function). Takes the value of (points to) the "owner" of the function in which the this keyword is used.
- this is NOT static. It depends on how the function is called, and its value is only assigned when the function is actually called.
  - Method: `this = <Object that is calling the method>`
  - Simple function call: `this = undefined` (In strict mode! Otherwise: window (in the browser))
  - Arrow functions: `this = <this of surrounding function (lexical this)>` (Don't get own this)
  - Event listener: `this = <DOM element that the handler is attached to>`
  - new, call, apply, bind

## The `this` Keyword in Practice

```js
console.log(this); // Window

const calcAge = function (birthYear) {
  console.log(2037 - birthYear); //46
  console.log(this); // undefined
};
calcAge(1991);

const calcAge = (birthYear) => {
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
```

## Regular Functions vs. Arrow Functions

Arrow function

```js
const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },

  greet: () => {
    console.log(this); // Window
    console.log(`Hey ${this.firstName}`); // Hey undefined
  },
};
jonas.greet();
console.log(this); // Window
```

Problem: an arrow function does not get its own `this` keyword, it will simply use the `this` keyword from its surroundings. So in other word, its parents `this` keyword. And the parent scope of this greet method is the global scope. Just note here that this object is actually not a code block, it doesn't create its own scope. It is an object literal. So it's just a way that we literally define objects. So all of this here is in the global scope still. And so that includes this greet method. And so the arrow function here, which does not have its own `this` keyword, will use the `this` keyword from the global scope.

Actually, this behavior can become pretty dangerous in case we use `var` to declare variables. Because that variables declared with `var` actually create properties on the global object.

```js
var firstName = "Matilda";

const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },

  greet: () => {
    console.log(this); // Window
    console.log(`Hey ${this.firstName}`); // Matilda
    // That should be avoided by using a regular function in an object
  },
};
jonas.greet();
console.log(this); // Window
console.log(this.firstName); // Undefined
```

```js
// Regular function
const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    const isMillenial = function () {
      console.log(this); // undefined
      console.log(this.year >= 1981 && this.year <= 1996); // ReferenceError
    };
    isMillenial();
  },
};
jonas.calcAge();
```

Problem: `isMillenial()` is really just a regular function call, even though it happens inside of a method. And the rule says that inside a regular function call, that `this` keyword must be undefined. So this is just as if this function was outside of this method.

Solution 1

```js
const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    const self = this; // self or that
    const isMillenial = function () {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996); // ReferenceError
    };
    isMillenial();
  },
};
jonas.calcAge();
```

This was kind of the pre ES6 solution. However, now in ES6 we have a more modern and better solution. And that solution is to use an arrow function.

Solution 2

```js
const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    const isMillenial = function () {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996); // ReferenceError
    };
    isMillenial();
  },
};
jonas.calcAge();
```

When we just call regular function, we get that to `this` keyword is undefined. And that's because a regular function gets its own `this` keyword. But the arrow function will not, it will simply use `this` keyword of its parent scope. And in this case, that will be the calcAge method and in here the `this` keyword is `Jonas`, so the `Jonas` object. And therefore then here in an arrow function, that would also be the `this` keyword. So basically an arrow function inherits the `this` keyword from the parent scope.

arguments keyword only exits in regular functions.

```js
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8); // ReferenceError
```

## Primitives vs. Objects (Primitive vs. Reference Types)

```js
// Primitives
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

// Objects
const me = {
  name: "Jonas",
  age: 30,
};
const friend = me;
friend.age = 27;
console.log("Friend:", friend);
console.log("Me", me);
```

Primitives:

- Number
- String
- Boolean
- Undefined
- Null
- Symbol
- BigInt

Objects:

- Object literal
- Arrays
- Functions
- Many more...

Memory and memory management:

- Primitives -> Primitive types -> stored in the call stack.
- Obejects -> Reference types -> stored in memoty heap.

![Primitives vs. Objects](/08-Behind-the-Scenes/img-notes/Primitives_Objects.png)
![Primitives vs. Objects](/08-Behind-the-Scenes/img-notes/Primitives_Objects_Memory.png)

## Primitives vs. Objects in Practice

```js
// Primitive types
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log("Before marriage:", jessica);
console.log("After marriage: ", marriedJessica);
// marriedJessica = {};
```

Copying objects

```js
// Copying objects
const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

const jessicaCopy = Object.assign({}, jessica2);
// merge two objects and return a new one which was in fact created in the heap, and `jessicaCopy` is now pointing to that object.
jessicaCopy.lastName = "Davis";

// This method only creates shallow copy. If we have an objects inside the object, then this inner object will actually still be the same. So it will still point to the same place in memory.
// Shallow copy will only copy the properties in the first level while a deep clone would copy everything.

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");

// Both changed
console.log("Before marriage:", jessica2);
console.log("After marriage: ", jessicaCopy);
```

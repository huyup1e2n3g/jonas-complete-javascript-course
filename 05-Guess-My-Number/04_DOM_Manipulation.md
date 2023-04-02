# 04 JavaScript in the Browser: DOM and Events Fundamentals

## querySelector

```js
console.log(document.querySelector(".message").textContent);
document.querySelector(".message").textContent = "🎉 Correct Number";

document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);

const score0 = document.querySelector("#score--0");
const score1 = document.queryElementById("score--1");
```

## Event Listener

```js
// addEventListener: Event, React (function)
document.querySelector(".check").addEventListener("click", function () {
  console.log(document.querySelector(".guess").value);
});
```

## Manipulating CSS Styles

```js
document.querySelector("body").style.backgroundColor = "#60b347";
document.querySelector(".number").style.width = "30rem";
```

## Working With Classes

```js
const modal = document.querySelector("modal");
modal.classList.remove("hidden");
```

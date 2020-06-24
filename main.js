// define variable
const keys = document.querySelectorAll(".key");

const numbers = document.querySelectorAll(".number");
const symbols = document.querySelectorAll(".symbol");
const equalSign = document.querySelector(".equals");
// const display = document.querySelector("#display");
const displayExpression = document.querySelector(".display.expression");
const displayResults = document.querySelector(".display.results");

// // add funct
keys.forEach(key => key.addEventListener("click", e => {
    displayExpression.innerHTML += (e.target.textContent);
}));
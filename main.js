// define variable
const keys = document.querySelectorAll(".key");

const numbers = document.querySelectorAll(".number");
const symbols = document.querySelectorAll(".symbol");
const equalSign = document.querySelector(".equals");
// const display = document.querySelector("#display");
const display = document.querySelector(".display");


// // add funct
keys.forEach(key => key.addEventListener("click", e => {
    display.innerHTML += (e.target.textContent);
}));
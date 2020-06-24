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
const parseExpressionWithDivision = (expression) =>{
    const DivisionSeparatedNums = expression.split("÷");
    const numbers =  DivisionSeparatedNums.map(nums => +nums);
    const intialValue = numbers[0];
    // const newNums = numbers.slice(1)
    // console.log(numbers.slice(1))

    result = numbers.slice(1).reduce((acc, nums) => acc / nums, intialValue )
    console.log("result with div "+ result) ;
        return result;

};

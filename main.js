// define variable
const keys = document.querySelectorAll(".key");

const numbers = document.querySelectorAll(".number");
const symbols = document.querySelectorAll(".symbol");
const equalSign = document.querySelector(".equals");

const displayExpression = document.querySelector(".display.expression");
const displayResults = document.querySelector(".display.results");

// // add funct
keys.forEach(key => key.addEventListener("click", e => {
    displayExpression.innerHTML += (e.target.textContent);
}));

equalSign.addEventListener("click", e => {
    const expression =  displayExpression.innerHTML;
    return evaluate(expression)
});

const parseExpressionWithDivision = (expression) =>{
    const DivisionSeparatedNums = expression.split("÷");
    const numbers =  DivisionSeparatedNums.map(nums => +nums);
    const intialValue = numbers[0];

    result = numbers.slice(1).reduce((acc, nums) => acc / nums, intialValue )
    return result;

};

const parseExpressionWithMultiplication = (expression) =>{
    const MultiplicationSeparatedNums = expression.split("*")
    const numbers = MultiplicationSeparatedNums.map(nums => parseExpressionWithDivision(nums));
    const initialValue = 1.0;

    const result = numbers.reduce((acc, nums) => acc * nums, initialValue);
    return result;

};

const parseExpressionWithPlus = (expression) =>{
    const plusSeparatedNums = expression.split("+")
    const numbers = plusSeparatedNums.map(nums => parseExpressionWithMultiplication(nums));
    const initialValue = 0.0;
    
	const result = numbers.reduce((acc, nums) => acc + nums, initialValue);
    return result;

}

const parseExpressionWithminus= (expression) =>{
    const minusSeparatedNums = expression.split("-");
    const numbers = minusSeparatedNums.map(nums => parseExpressionWithPlus(nums));
    const initialValue = numbers[0];
	const result = numbers.slice(1).reduce((acc, nums) => acc - nums, initialValue);
    displayResults.innerHTML = result;

    return result;
}

const evaluate = (expression) =>parseExpressionWithminus(expression);



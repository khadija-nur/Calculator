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

const parseExpressionWithMultiplication = (expression) =>{
    const MultiplicationSeparatedNums = expression.split("*")
    const numbers = MultiplicationSeparatedNums.map(nums => parseExpressionWithDivision(nums));
    const initialValue = 1.0;
	const result = numbers.reduce((acc, nums) => acc * nums, initialValue);
    console.log("result with mult "+ result) ;
    return result;

};

const parseExpressionWithPlus = (expression) =>{
    const plusSeparatedNums = expression.split("+")
    const numbers = plusSeparatedNums.map(nums => parseExpressionWithMultiplication(nums));
    const initialValue = 0.0;
	const result = numbers.reduce((acc, nums) => acc + nums, initialValue);

    console.log("result with plus "+ result) ;
    return result;

}

const parseExpressionWithminus= (expression) =>{
    const minusSeparatedNums = expression.split("-");
    const numbers = minusSeparatedNums.map(nums => parseExpressionWithPlus(nums));
    const initialValue = numbers[0];
	const result = numbers.slice(1).reduce((acc, nums) => acc - nums, initialValue);
    console.log("result with minus "+ result) ;
    displayResults.innerHTML = result;
    return result;



}

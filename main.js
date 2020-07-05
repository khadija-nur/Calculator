// define variable
const keys = document.querySelectorAll(".key");
const soundEffect =new Audio('button.mp3')

const numberKeys = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const operatorStrings = ["+", "-", "*", "÷"]

const equalSign = document.querySelector(".equals");
const dot = document.querySelector(".dot")
console.log(dot);
const displayExpression = document.querySelector(".display.expression");

const displayResults = document.querySelector(".display.results");
let canUseDot;


keys.forEach(key => key.addEventListener("click", e => {
  
    soundEffect.play();

    else if (!operators.includes(e.target)){

        if (e.target !== dot){
            displayExpression.innerHTML += (e.target.textContent);
            canUseDot = true;   
            console.log("does not have dot")

        }

        else{
               if (canUseDot == true){
                displayExpression.innerHTML += (e.target.textContent);
                canUseDot = false;

               }
               else{
                   rejectKey(e.target)
               }

        }
    }
    else{
        canUseDot = false;
        if ( displayExpression.innerHTML == ""){
            rejectKey(e.target);
        }
        else
            consecutiveOperators(e.target, displayExpression.innerHTML)
    }
}));

equalSign.addEventListener("click", e => {

    const expression =  displayExpression.innerHTML;
    soundEffect.play()
    return evaluate(expression);
});

// add functions
const consecutiveOperators = (pressedKey, expression) => {
    console.log("functioon coperators ")

        if (!(operatorStrings.includes(expression[expression.length - 1]))){
            if ((expression[expression.length - 1]) == dot){
                rejectKey(pressedKey);
            }
            else
                displayExpression.innerHTML += pressedKey.innerHTML;

        }
        else if (!(operatorStrings.includes(expression[expression.length - 2])) ){
            console.log("ony last one is operator")
            if (pressedKey.innerHTML == "÷" || pressedKey.innerHTML == "*"){
                rejectKey(pressedKey);
            }
            else{
                displayExpression.innerHTML += pressedKey.innerHTML
            }
        }
        
        else if (operatorStrings.includes(expression[expression.length - 1]) && operatorStrings.includes(expression[expression.length - 2])){

            if (pressedKey.innerHTML == "÷" || pressedKey.innerHTML == "*"){
                rejectKey(pressedKey);
            }
            else{
                displayExpression.innerHTML = expression.slice(0, -1) + pressedKey.innerHTML;
            }
        }

        else{
            console.log("done last els")
        }
    
}
const rejectKey = (key) => key.classList.toggle("reject");

// check for unnesessary zeros
// properdecimaluse
// evaluationOnResults

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



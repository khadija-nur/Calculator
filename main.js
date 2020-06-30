// define variable
const keys = document.querySelectorAll(".key");

const numberKeys = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const operatorStrings = ["+", "-", "*", "÷"]

const equalSign = document.querySelector(".equals");

const displayExpression = document.querySelector(".display.expression");

const displayResults = document.querySelector(".display.results");

// // excecute functions
keys.forEach(key => key.addEventListener("click", e => {

    // let displayTab = displayExpression.innerHTML;
    // if key is * or ÷ then the one being clicked can only be a plus or minus key 
    // more than one zero cannot appear without anything before it
    // there cannot be more than two operators
    // there cannot be a dot followed by nothing
    // if a key is pressed after the equal sign the:
            // if the key is a number it should the expression should start afresh 
            // else if the the key pressed is a symbol it should continue with the results of the expression and not the results themselves
    if (!operators.includes(e.target)){
            displayExpression.innerHTML += (e.target.textContent);
    }
    else{
        consecutiveOperators(e.target, displayExpression.innerHTML)

    }
    // displayExpression.innerHTML += (e.target.textContent);

}));

const displayOperator = (operator =>{
    displayExpression.innerHTML += (operator);

})
equalSign.addEventListener("click", e => {
    const expression =  displayExpression.innerHTML;
    return evaluate(expression);
});


// add functions

// check for the keys before 
const consecutiveOperators = (pressedKey, expression) => {
    console.log("functioon coperators ")
    // if the pressed key is an operator 
    //  check if the two keys before it are also operators
    // if the two keys before it are operators
        // then the last key should be replaced with the current key that is being pressed
        // else if only the last key is an operator and the one before is not:
            // then check what operator it is
            // if its a division or multiplication then it shouldnt be followed by either of the two
        // console.log(expression[expression.length - 1])
        // console.log(operatorStrings.includes(expression[expression.length - 2]))
        if (!(operatorStrings.includes(expression[expression.length - 1]))){
           console.log("WHAT WHAT")
            displayExpression.innerHTML += pressedKey.innerHTML;

        }
        else if (!(operatorStrings.includes(expression[expression.length - 2])) ){
            console.log("ony last one is operator")
            if (pressedKey.innerHTML == "÷" || pressedKey.innerHTML == "*"){
                rejectKey(pressedKey);

            }
            else{
                displayExpression.innerHTML += pressedKey.innerHTML;

            }
        }
        
        else if (operatorStrings.includes(expression[expression.length - 1]) && operatorStrings.includes(expression[expression.length - 2])){

            console.log("2 ")
            console.log(expression.slice(0, -1))
            console.log(pressedKey.innerHTML)
            console.log(expression.slice(0, -1) + pressedKey.innerHTML)
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
const rejectKey = (key) => key.classList.add("reject");

// norepeatingoperators
// ckeck for unnesessary zeros
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



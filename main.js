// define variable
const keys = document.querySelectorAll(".key");
const soundEffect = new Audio('button.mp3')

const numberKeys = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const operatorStrings = ["+", "-", "*", "÷"]

const equalSign = document.querySelector(".equals");
const dot = document.querySelector(".dot")
const zero = document.querySelector(".zero")
const clear = document.querySelector(".clear")
const del = document.querySelector(".delete")

const displayExpression = document.querySelector(".display.expression");
const displayResults = document.querySelector(".display.results");

let canUseDot;
let canInputZero = true;

keys.forEach(key => key.addEventListener("click", e => {
    const lastCharacterOnDisplay = displayExpression.innerHTML[displayExpression.innerHTML.length - 1];
    const secLastCharacterOnDisplay = displayExpression.innerHTML[displayExpression.innerHTML.length - 2];
    // plays clicking key sounds
    soundEffect.play();
    // check for unnecessary zeros 
    if (e.target == zero) {
        checkForZeros(e.target, displayExpression.innerHTML)
    }

    else if (!operators.includes(e.target)) {
        if (e.target !== dot) {
            // if we are pressing a number and the display has an operator followed by zero at the end :-eg +0
            //  then replace the zero with whatever number we are typing

            if (operatorStrings.includes(secLastCharacterOnDisplay) && lastCharacterOnDisplay == "0") {
                displayExpression.innerHTML = displayExpression.innerHTML.slice(0, -1) + e.target.innerHTML;
            }
            else {
                displayExpression.innerHTML += (e.target.textContent);
                canUseDot = true;
            }
        }
        else {
            if (canUseDot == true) {
                displayExpression.innerHTML += (e.target.textContent);
                canUseDot = false;
            }
            else rejectKey(e.target)
        }
    }
    else {
        canUseDot = false;
        if (displayExpression.innerHTML == "") rejectKey(e.target);
        else consecutiveOperators(e.target, displayExpression.innerHTML)
    }
}));



// add functions
const consecutiveOperators = (pressedKey, expression) => {
    // if last character on display is not an operator but a dot reject key
    //but if the last character is a number the allow the user to input the operator
    console.log("1")
    if (!(operatorStrings.includes(expression[expression.length - 1]))) {
        if ((expression[expression.length - 1]) == dot) rejectKey(pressedKey);
        else displayExpression.innerHTML += pressedKey.innerHTML;
    }

    // if only the last character is an operator 
    // then replace it with the key we are pressing
    // but if it is a minus then allow the user to input it 
    else if (!(operatorStrings.includes(expression[expression.length - 2]))) {
        if ((operatorStrings.includes(expression[expression.length - 1])) && pressedKey.innerHTML !== "-")
            displayExpression.innerHTML = expression.slice(0, -1) + pressedKey.innerHTML;
        else displayExpression.innerHTML += pressedKey.innerHTML
    }
    else rejectKey(pressedKey)
}

equalSign.addEventListener("click", e => {
    const expression = displayExpression.innerHTML;
    soundEffect.play()
    evaluate(expression);
    displayExpression.innerHTML = displayResults.innerHTML;
});

clear.addEventListener("click", e => {
    displayExpression.innerHTML = "";
    displayResults.innerHTML = ""
})

del.addEventListener("click", e => {
    console.log("hello")
    displayExpression.innerHTML = displayExpression.innerHTML.slice(0, -1)
})
const rejectKey = (key) => {
    key.classList.remove("reject");
    setTimeout( () => key.classList.add("reject"),25);
}

const canIPressZero = (expression) => {
    return (operatorStrings.includes(displayExpression.innerHTML[displayExpression.innerHTML.length - 1])) ? canInputZero = true
        : (expression.length == 1 && expression == "0") ? canInputZero = false
            : (operatorStrings.includes(expression[expression.length - 2]) && expression[expression.length - 1] == "0") ? canInputZero = false
                : canInputZero = true;
}

const checkForZeros = (pressedKey, expression) => {
    canIPressZero(expression)

    return (canInputZero == true) ? displayExpression.innerHTML += pressedKey.innerHTML
        : rejectKey(pressedKey),
        displayExpression.innerHTML = expression.slice(0, -1) + pressedKey.innerHTML;
}


// mathematical operations functions below:
const parseExpressionWithDivision = (expression) => {
    const DivisionSeparatedNums = expression.split("÷");
    const numbers = DivisionSeparatedNums.map(nums => +nums);
    const intialValue = numbers[0];
    result = numbers.slice(1).reduce((acc, nums) => acc / nums, intialValue)
    return result;
};


const parseExpressionWithMultiplication = (expression) => {
    const MultiplicationSeparatedNums = expression.split("*")
    const numbers = MultiplicationSeparatedNums.map(nums => parseExpressionWithDivision(nums));
    const initialValue = 1.0;

    const result = numbers.reduce((acc, nums) => acc * nums, initialValue);
    return result;
};

const parseExpressionWithPlus = (expression) => {
    const plusSeparatedNums = expression.split("+")
    const numbers = plusSeparatedNums.map(nums => parseExpressionWithMultiplication(nums));
    const initialValue = 0.0;
    const result = numbers.reduce((acc, nums) => acc + nums, initialValue);
    return result;
}

const parseExpressionWithminus = (expression, containsMinus) => {
    const minusSeparatedNums = expression.split("-");
    const numbers = minusSeparatedNums.map(nums => parseExpressionWithPlus(nums));
    const initialValue = numbers[0];

    let result = numbers.slice(1).reduce((acc, nums) => acc - nums, initialValue);

    if (containsMinus) result = '-' + result;
    displayResults.innerHTML = result;
}

const handleOperatorWithMinus = (expression) => {
    let containsMinus = false

    if (((expression.split("-").length - 1) % 2) != 0) containsMinus = true

    expression = expression.replace("--", "+").replace("*-", "*").replace("÷-", "÷")
    parseExpressionWithminus(expression, containsMinus)
}
const evaluate = (expression) => handleOperatorWithMinus(expression);
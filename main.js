// define variable
const keys = document.querySelectorAll(".key");
const soundEffect =new Audio('button.mp3')

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


    // plays clicking key sounds
    soundEffect.play();

    // check for unnecessary zeros 
    if (e.target == zero ){
        console.log("ehvsd")
        checkForZeros(e.target, displayExpression.innerHTML)
        // console.log("e.target is zero")
        // if (displayExpression.innerHTML == ""){
        //     console.log("empty display")

        //     displayExpression.innerHTML += e.target.innerHTML
        //     canInputZero = false;
        //     console.log(canInputZero)
        // }
        // else if (
        //     operatorStrings.includes(displayExpression.innerHTML[displayExpression.innerHTML.length-2])
        // ){
        //     canInputZero == false
        // }
        // else if (canInputZero == false){
        //     console.log(canInputZero)

        //     console.log("zeros should not be here")
        //     checkForZeros(e.target, displayExpression.innerHTML)
        //     canInputZero = true;
        // }
        // else{
        //     console.log(canInputZero)

        //     if(operatorStrings.includes(displayExpression.innerHTML[displayExpression.innerHTML.length - 2])){
        //         displayExpression.innerHTML += e.target.innerHTML
        //         canInputZero = false;
        //     }
        //     else
        //     displayExpression.innerHTML += e.target.innerHTML
        // }
      
    }
    
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
        else
            displayExpression.innerHTML += pressedKey.innerHTML
    }
    else if (operatorStrings.includes(expression[expression.length - 1]) && operatorStrings.includes(expression[expression.length - 2])){

        if (pressedKey.innerHTML == "÷" || pressedKey.innerHTML == "*"){
            rejectKey(pressedKey);
        }
        else
            displayExpression.innerHTML = expression.slice(0, -1) + pressedKey.innerHTML;
    }
    else
        console.log("done last else")
}

// const rejectKey = (key) =>{
//     key.classList.add("reject");

//     setinterval(key.classList.remove("reject"), 300)

    
clear.addEventListener("click", e => {
    displayExpression.innerHTML = "";
    displayResults.innerHTML = ""
})

del.addEventListener("click", e => {
    console.log("hello")
    displayExpression.innerHTML = displayExpression.innerHTML.slice(0, -1)
})
    key.classList.remove("reject");
    setTimeout(
      function() {
        key.classList.add("reject");
      },
      25
    );
  }

// check for unnesessary zeros

// PROBLEMS:
// no zero should appear before a number
// no zeros should appear before a dp without a closing digit at the end of them
// not more than one zero should appear before a dot
// no more than one zero should appear on its own

// SOLUTIONS
// if pressedkey = 0; and the character before it is an operator
// then set our variable(canInputZero) to false so that we cannot add more zeros to it 
// if the pressed is a non-zero number and xracter before it is a zero
// the slice the expression to remove the zero and replace it with the pressed key

// (displayExpression.innerHTML[displayExpression.innerHTML.length - 1] == "0") 
//         && operatorStrings.includes(displayExpression.innerHTML[displayExpression.innerHTML.length - 1]))

const canIPressZero = (expression) =>{

    if (operatorStrings.includes(displayExpression.innerHTML[displayExpression.innerHTML.length-1])){
        canInputZero = true;
    }
    else if ( expression.length == 1 && expression == "0"){
        canInputZero = false;
    }
    else if ( operatorStrings.includes(expression[expression.length -2]) && expression[expression.length -1] == "0"
    )
    {
        canInputZero = false;
    }

}
const checkForZeros = (pressedKey, expression) => {
    canIPressZero(expression)
    console.log("can i input zero")
    if(canInputZero == true){
        displayExpression.innerHTML += pressedKey.innerHTML
    }
    else{
        rejectKey(pressedKey)
        displayExpression.innerHTML = expression.slice(0, -1) + pressedKey.innerHTML;

    }
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
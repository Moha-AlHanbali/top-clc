"use strict";

let leftOperand = "";
let rightOperand = "";
let operator = "";
let display = "";

const operationList = ["+", "-", "*", "/"];
const screenDisplay = document.getElementsByClassName('calculator-screen')[0];
const numbers = Array.from(document.getElementsByClassName('number-button'));
const operators = Array.from(document.getElementsByClassName('function-button'));
const evaluateButton = document.getElementsByClassName('evaluate-button')[0];

const add = (x, y) => { return x + y };
const subtract = (x, y) => { return x - y };
const multiply = (x, y) => { return x * y };
const divide = (x, y) => { return x / y };

const operate = (operation, x, y) => {
    x = Number(x);
    y = Number(y);
    switch (operation) {
        case "+":
            return add(x, y);

        case "-":
            return subtract(x, y);

        case "*":
            return multiply(x, y);

        case "/":
            return divide(x, y);

        default:
            return
    };

};

const resetValues = () => {
    leftOperand = "";
    rightOperand = "";
    operator = "";
    display = "";
    screenDisplay.textContent = "0";
    return
}


numbers.forEach(numberButton => {
    numberButton.addEventListener('click', (e) => {
        registerInput(e.target.value);
    });
});

operators.forEach(numberButton => {
    numberButton.addEventListener('click', (e) => {
        registerInput(e.target.value);
    });
});

evaluateButton.addEventListener('click', () => {
    evaluate();
})

const registerInput = (buttonValue) => {
    if (operationList.includes(buttonValue)) {
        if (rightOperand) {
            leftOperand = operate(operator, leftOperand, rightOperand);
            rightOperand = "";
        }
        operator = buttonValue;
        screenDisplay.textContent = `${leftOperand} ${operator} ${rightOperand}`;
        return
    }
    try {
        const numericValue = parseFloat(buttonValue);
        if (!operator) leftOperand += numericValue.toString();
        else rightOperand += numericValue.toString();
        screenDisplay.textContent = `${leftOperand} ${operator} ${rightOperand}`;
    }
    catch {
        screenDisplay.textContent = `ERROR`;
        leftOperand = "";
        rightOperand = "";
        operator = "";
    }
    return
}

const evaluate = () => {
    if (rightOperand) {
        leftOperand = operate(operator, leftOperand, rightOperand);
    }
    rightOperand = "";
    operator = "";
    screenDisplay.textContent = `${leftOperand}`;
    console.log("evaluate", rightOperand, operator)
    return
}
resetValues();
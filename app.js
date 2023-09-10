"use strict";

let leftOperand = "";
let rightOperand = "";
let operator = "";
let display = "";

const operationList = ["+", "-", "*", "/"];
const screenDisplay = document.getElementsByClassName('calculator-screen')[0];
const numbers = Array.from(document.getElementsByClassName('number-button'));
const operators = Array.from(document.getElementsByClassName('function-button'));

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

const registerInput = (buttonValue) => {
    if (operationList.includes(buttonValue)) {
        if (rightOperand) {
            leftOperand = operate(operator, leftOperand, rightOperand);
            rightOperand = "";
        }
        operator = buttonValue;
        display = `${leftOperand} ${operator} ${rightOperand}`
        screenDisplay.textContent = display;
        return
    }
    try {
        const numericValue = parseFloat(buttonValue);
        if (!operator) leftOperand += numericValue;
        else rightOperand += numericValue;
        display = `${leftOperand} ${operator} ${rightOperand}`
        screenDisplay.textContent = display;
    }
    catch {

    }
    return
}

resetValues();
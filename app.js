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
const decimalButton = document.getElementsByClassName('decimal-button')[0];

const add = (x, y) => { return x + y };
const subtract = (x, y) => { return x - y };
const multiply = (x, y) => { return x * y };
const divide = (x, y) => { return x / y };

const operate = (operation, x, y) => {
    x = Number(x);
    y = Number(y);
    switch (operation) {
        case "+":
            return add(x, y).toString();

        case "-":
            return subtract(x, y).toString();

        case "*":
            return multiply(x, y).toString();

        case "/":
            return divide(x, y).toString();

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
});

decimalButton.addEventListener('click', () => {
    addDecimal();
});

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
        const numericValue = parseInt(buttonValue);
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
    return
}

const addDecimal = () => {
    if (operator) {
        if (!rightOperand.includes(".")) {
            rightOperand += ".";
        }
    } else {
        if (!leftOperand.includes(".")) {
            leftOperand += ".";
        }
    }
    screenDisplay.textContent = `${leftOperand} ${operator} ${rightOperand}`;
}

resetValues();
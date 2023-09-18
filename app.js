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

const clearEntryButton = document.getElementById('clear-entry');
const clearButton = document.getElementById('clear');

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

const clear = () => {
    leftOperand = "0";
    rightOperand = "";
    operator = "";
    display = "";
    updateDisplay()
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

clearEntryButton.addEventListener('click', () => {
    clearEntry();
});

clearButton.addEventListener('click', () => {
    clear();
});

const registerInput = (buttonValue) => {
    if (operationList.includes(buttonValue)) {
        if (rightOperand) {
            leftOperand = operate(operator, leftOperand, rightOperand);
            rightOperand = "";
        }
        operator = buttonValue;
        updateDisplay()
        return
    }
    try {
        if (!operator) {
            leftOperand === "0" ? leftOperand = buttonValue : leftOperand += buttonValue;
        }
        else rightOperand === "0" ? rightOperand = buttonValue : rightOperand += buttonValue;
        updateDisplay()
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
    updateDisplay()
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
    updateDisplay()
}

const clearEntry = () => {
    if (rightOperand) {
        rightOperand = rightOperand.slice(0, -1);
    }
    else {
        leftOperand = leftOperand.slice(0, -1);
    }
    updateDisplay()
}

const updateDisplay = () => {
    screenDisplay.textContent = `${leftOperand} ${operator} ${rightOperand}`;
}
clear();
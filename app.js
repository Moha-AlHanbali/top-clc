"use strict";

let leftOperand = "";
let rightOperand = "";
let operator = "";
let errorFlag = false;

const operationList = ["+", "-", "*", "/"];
const screenDisplay = document.getElementsByClassName('calculator-screen')[0];
const numbers = Array.from(document.getElementsByClassName('number-button'));
const operators = Array.from(document.getElementsByClassName('operation-button'));

const decimalButton = document.getElementById('decimal-button');
const evaluateButton = document.getElementById('evaluate-button');
const clearEntryButton = document.getElementById('clear-entry');
const clearButton = document.getElementById('clear');

const add = (x, y) => { return x + y };
const subtract = (x, y) => { return x - y };
const multiply = (x, y) => { return x * y };
const divide = (x, y) => {
    if (y != "0") return x / y
    else {
        errorFlag = true;
        screenDisplay.textContent = "ERROR";
    }
};

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
    errorFlag = false;
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
    if (errorFlag) return;
    if (`${leftOperand} ${operator} ${rightOperand}`.length > 10) return; // Lazy constraint for consistent display 
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
        errorFlag = true;
        screenDisplay.textContent = `ERROR`;
    }
    return
}

const evaluate = () => {
    if (errorFlag) return;

    if (rightOperand) {
        leftOperand = operate(operator, leftOperand, rightOperand);
    }
    rightOperand = "";
    operator = "";
    updateDisplay()
    return
}

const addDecimal = () => {
    if (errorFlag) return;

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
    if (errorFlag) return;

    if (rightOperand) {
        rightOperand = rightOperand.slice(0, -1);
    }
    else {
        leftOperand.slice(0, -1) === "" ? leftOperand = "0" : leftOperand = leftOperand.slice(0, -1);
    }
    updateDisplay()
}

const updateDisplay = () => {
    screenDisplay.textContent = `${leftOperand} ${operator} ${rightOperand}`;
}


document.addEventListener('keydown', function (event) {
    if (/^[0-9+\-*/]$/.test(event.key)) {
        registerInput(event.key);
    }
    if (event.key === ".") addDecimal();
    if (event.key === "Backspace") clearEntry();
    if (event.key === "Enter") evaluate();
});

clear();
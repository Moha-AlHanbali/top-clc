"use strict";

const add = (x, y) => { return x + y };
const subtract = (x, y) => { return x - y };
const multiply = (x, y) => { return x * y };
const divide = (x, y) => { return x / y };

const operate = (operation, x, y) => {
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
}

let leftOperand = "";
let rightOperand = "";
let operator = "";
let display = "";


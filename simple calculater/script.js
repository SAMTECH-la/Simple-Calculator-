// script.js

const display = document.getElementById('display');
const calculation = document.getElementById('calculation');
const historyDiv = document.getElementById('history');
const buttons = document.querySelectorAll('.button');
let currentInput = '';
let operator = '';
let firstOperand = null;
let calcHistory = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleInput(value);
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '=' || key === 'Enter' || key === 'Backspace' || key === 'Escape' || key === 'c') {
        handleInput(key);
    }
});

function handleInput(value) {
    if (value >= '0' && value <= '9' || value === '.') {
        currentInput += value;
        display.innerText = currentInput;
    } else if (value === 'C' || value === 'c') {
        currentInput = '';
        display.innerText = '';
    } else if (value === 'AC' || value === 'Escape') {
        currentInput = '';
        operator = '';
        firstOperand = null;
        calcHistory = '';
        display.innerText = '';
        calculation.innerText = '';
        historyDiv.innerText = '';
    } else if (value === 'H') {
        historyDiv.style.display = historyDiv.style.display === 'none' ? 'block' : 'none';
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            calcHistory = `${currentInput} ${operator} `;
            currentInput = '';
        } else if (operator) {
            firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
            operator = value;
            calcHistory += `${currentInput} ${operator} `;
            display.innerText = firstOperand;
            currentInput = '';
        }
        calculation.innerText = calcHistory;
    } else if (value === '=' || value === 'Enter') {
        if (firstOperand !== null && operator && currentInput !== '') {
            firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
            calcHistory += `${currentInput} = ${firstOperand}\n`;
            display.innerText = firstOperand;
            calculation.innerText = '';
            historyDiv.innerText += calcHistory;
            currentInput = '';
            operator = '';
            calcHistory = '';
        }
    } else if (value === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.innerText = currentInput;
    }
}

function operate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
    }
}

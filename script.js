const calculator = {
  displayValue: 0,
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue == '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
} // input numbers and fixing data operator buttons + - * / (ab 10).

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
} // funkcion of decimal numbers

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {                                   // this block is added to see if the property is assignet to operator if it is than the result is saved in result variable
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
} // operator fix and converting String to a number with parseFloat



function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
} // reset all (AC)

function deleteChar() {
  let number = document.querySelectorAll('.delete-number');
  let displayValue = document.querySelector('#display').value;
  console.log(displayValue)
  let newDisplayvalue = displayValue.replace(displayValue[displayValue.length - 1], "")
  calculator.displayValue = newDisplayvalue;
}



function updateDisplay() {
  const display = document.querySelector('#display');
  display.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  // Access the clicked event.
  const { target } = event;

  //Check if the clicked element is a button.
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('data-operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('data-number')) {
    inputDigit(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('delete-number')) {
    console.log('dlOperator', target.value);
    deleteChar();
    updateDisplay();
    return;
  }
  if (target.classList.contains('equal-sign-operator')) {
    console.log('esOperator', target.value);
    handleOperator();
    updateDisplay();

    return;
  }

  if (target.classList.contains('decimal')) {
    console.log('decimal', target.value);
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('data-all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

});// handle key presses


// have to finish DEL button and %

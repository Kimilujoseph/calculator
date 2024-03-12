const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const allClear = document.querySelector("[data-all-clear]");
const previousOperandDisplay = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandDisplay = document.querySelector("[data-current-operand]");

// class Calculator {
//   constructor(previousOperandDisplay, currentOperandDisplay) {
//     this.previousOperandDisplay = previousOperandDisplay;
//     this.currentOperandDisplay = currentOperandDisplay;
//     this.clear();
//   }

//   clear() {
//     this.currentOperand = "";
//     this.previousOperand = "";
//     this.operation = undefined;
//   }

//   delete() {
//     this.currentOperand = this.currentOperand.toString().slice(0, -1);
//   }

//   appendnumbers(number) {
//     if (number === "." && this.currentOperand.includes(".")) return;
//     this.currentOperand = this.currentOperand.toString() + number.toString();
//   }

//   chooseOperation(operation) {
//     if (this.currentOperand === "") return;

//     this.operation = operation;
//     this.previousOperand = this.currentOperand;
//     this.currentOperand = "";
//   }

//   compute() {
//     let computation;
//     const prev = parseFloat(this.previousOperand);
//     const current = parseFloat(this.currentOperand);
//     switch (this.operation) {
//       case "+":
//         computation = prev + current;
//         break;
//       case "-":
//         computation = prev - current;
//         break;
//       case "/":
//         computation = prev / current;
//         break;
//       case "*":
//         computation = prev * current;
//         break;
//       default:
//         return;
//     }

//     this.currentOperand = computation;
//   }

//   getDisplay(number) {
//     const stringNUmber = number.toString();
//     const integerNumbers = parseFloat(stringNUmber.split(".")[0]);
//     const decimalNumbers = stringNUmber.split(".")[0];
//     let integerDisplay;

//     if (isNaN(integerNumbers)) {
//       integerDisplay = "";
//     } else {
//       integerDisplay = integerNumbers.toLocaleString("en", {
//         maximumFractionDigits: 0,
//       });
//     }

//     if (decimalNumbers != null) {
//       return `${integerNumbers} ${decimalNumbers}`;
//     } else {
//       return integerDisplay;
//     }
//   }

//   updateDisplay() {
//     this.currentOperandDisplay.innerHTML = this.getDisplay(this.currentOperand);
//     this.previousOperandDisplay.innerHTML = this.previousOperand;
//   }
// }

// const calculator = new Calculator(
//   previousOperandDisplay,
//   currentOperandDisplay
// );

// numberButton.forEach((button) => {
//   button.addEventListener("click", () => {
//     calculator.appendnumbers(button.innerHTML);
//     calculator.updateDisplay();
//   });
// });

// operationButton.forEach((button) => {
//   button.addEventListener("click", () => {
//     calculator.chooseOperation(button.innerHTML);
//     calculator.updateDisplay();
//   });
// });

// equalButton.addEventListener("click", () => {
//   calculator.compute();
//   calculator.updateDisplay();
// });

// allClear.addEventListener("click", (button) => {
//   calculator.clear();
//   calculator.updateDisplay();
// });

// deleteButton.addEventListener("click", () => {
//   calculator.delete();
//   calculator.updateDisplay();
// });

class Calculator {
  constructor(previousOperandDisplay, currentOperandDisplay) {
    this.previousOperandDisplay = previousOperandDisplay;
    this.currentOperandDisplay = currentOperandDisplay;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  getDisplay(number) {
    const stringnumber = number.toString();
    const integerDigits = parseFloat(stringnumber.split(".")[0]);
    const decimalDigits = stringnumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDigits = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDigits}.${decimalDigits} `;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(Operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = Operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;

    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandDisplay.innerHTML = this.getDisplay(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandDisplay.innerHTML = `${this.previousOperand} ${this.operation}`;
    }
  }
}

const calculator = new Calculator(
  previousOperandDisplay,
  currentOperandDisplay
);

//deal with numbers

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
allClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        // Only allow the user to return a period once.
        if (number === "." && this.currentOperand.includes(".")){
            return ;
        }
        // Change to string, if it is in numbers, the numbers will be added instead of concatenation.
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        // Check for whether the current operand is empty or not. If this is not included , the user can press "+" twice and the display will be empty.
        if (this.currentOperand === ""){
            return ;
        }
        if (this.previousOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        // Make the current operand go up when an operation is pressed. //
        this.previousOperand = this.currentOperand;
        this.currentOperand  = "";
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // Check if this is a number. If this is not, then we do not compute anything.
        if (isNaN(prev) || isNaN(current)){
            return
        }
        switch(this.operation){
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            // Don't want to do any computation if the operator is invalid.
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        // Happens when someone inputs nothing or decimal place.
        if (isNaN(integerDigits)){
            integerDisplay = '';
        } else{
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits:0 // Ensure that there is no decimal places after this.
            })
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        } else{
            return integerDisplay;
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        // If an operation is clicked by the user.
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = "";
        }
    }
}

// Must be inside square brackets //
const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")
const audio = document.getElementById("audio")

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (audio.paused){
            audio.play();
        }else{
            audio.currentTime = 0;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (audio.paused){
            audio.play();
        }else{
            audio.currentTime = 0;
        }
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", button =>{
    if (audio.paused){
        audio.play();
    }else{
        audio.currentTime = 0;
    }
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", button =>{
    if (audio.paused){
        audio.play();
    }else{
        audio.currentTime = 0;
    }
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button =>{
    if (audio.paused){
        audio.play();
    }else{
        audio.currentTime = 0;
    }
    calculator.delete();
    calculator.updateDisplay();
})

// Keyboard Support, have to introduce IDs for each button for this to work.
window.onkeydown = function(e){
    let x = e.key;
    let choice;
    switch(x){
        case "1":
            choice = document.querySelector("#one");
            choice.click();
            break;
        case "2":
            choice = document.querySelector("#two");
            choice.click();
            break;
        case "3":
            choice = document.querySelector("#three");
            choice.click();
            break;
        case "4":
            choice = document.querySelector("#four");
            choice.click();
            break;
        case "5":
            choice = document.querySelector("#five");
            choice.click();
            break;
        case "6":
            choice = document.querySelector("#six");
            choice.click();
            break;
        case "7":
            choice = document.querySelector("#seven");
            choice.click();
            break;
        case "8":
            choice = document.querySelector("#eight");
            choice.click();
            break;
        case "9":
            choice = document.querySelector("#nine");
            choice.click();
            break;
        case "0":
            choice = document.querySelector("#zero");
            choice.click();
            break;
        case "Backspace":
            choice = document.querySelector("#delete");
            choice.click();
            break;
        case "Escape":
            choice = document.querySelector("#clear");
            choice.click();
            break;
        case "Enter":
            choice = document.querySelector("#equals");
            choice.click();
            break;
        case "/":
            choice = document.querySelector("#divide");
            choice.click();
            break;
        case "+":
            choice = document.querySelector("#add");
            choice.click();
            break;
        case "-":
            choice = document.querySelector("#minus");
            choice.click();
            break;
        case "*":
            choice = document.querySelector("#multiply");
            choice.click();
            break;
        case ".":
            choice = document.querySelector("#decimal-point");
            choice.click();
            break;
    }
}

// let display = document.getElementById("display");
// let buttons = Array.from(document.querySelectorAll("button"));

// buttons.map(button => {
//     button.addEventListener("click", (e) => {
//         const audio = document.getElementById("audio")
//         if (audio.paused){
//             audio.play();
//         }else{
//             audio.currentTime = 0;
//         }
//         switch(e.target.innerText){
//             case "C":
//                 display.innerText = "";
//                 break;
//             case "←":
//                 display.innerText = display.innerText.slice(0,-1);
//                 break;
//             case "=":
//                 let len = display.innerText.length;
//                 for (let i = 0;i<len;i++){
//                     console.log(typeof(Number(display.innerText[i])));
//                 }
//                 break;
//             default:
//                 display.innerText += e.target.innerText;
//         }
//     });
// });

// function add(a,b){
//     return a+b;
// }

// function subtract(a,b){
//     return a-b;
// }

// function multiply(a,b){
//     return a*b;
// }

// function divide(a,b){
//     return a/b;
// }

// function operate(operator,a,b){
//     if (operator === "+"){
//         return add(a,b);
//     }
//     else if (operator === "-"){
//         return subtract(a,b);
//     }
//     else if (operator === "*"){
//         return multiply(a,b);
//     }
//     else if (operator === "+"){
//         return divide(a,b);
//     }
//     else{
//         return "Error!";
//     }
// }


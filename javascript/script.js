import { getByID, getValueByID, createElementWithText } from "./dom-utils.js";
import { beep } from "./beep.js";

const panel = getByID("panel");
const input = [];
let result = 0;
let memory = 0;
const inputButtonNum = document.querySelectorAll(".input-button--number");
const inputButtonOp = document.querySelectorAll(".input-button--operator");
const operators = ["+", "-", "×", "÷", "√"];

// Resets all changeable values to 0, resets display panel
const reset = () => {
    input.length = 0;
    input[0] = 0;
    updatePanel(input.join(''));
    result = 0;
    memory = 0;
}

// Sets result to 0 in case not cleared
// Checks if input array is valid (i.e. last input was numbers, not operator)
// Adds first input value to result
// Checks second input value (operator), applies operator to next input
// Jumps to next number value (every second)
const calculate = () => {
    result = 0;
    if (input.length % 2 === 0) { 
        result = "error";
    } else {
        result += input[0];
        for (let i = 0; i < input.length; i += 2) {
            switch (input[i+1]) {
                case "÷":
                    result = result / input[i+2]
                    break;
                case "×":
                    result = result * input[i+2]
                    break;
                case "+":
                    result = result + input[i+2]
                    break;
                case "-":
                    result = result - input[i+2]
                    break;
                case "√":
                    result = result * Math.sqrt(input[i+2])
                    break;
            }
            
        }
    }
}
// Updates panel display
const updatePanel = (toDisplay) => {
    panel.innerText = toDisplay;
}
// Turns on panel
getByID("onAC").addEventListener("click", () => {
    panel.classList.add("panel--on");
    reset();
})
// Turns off panel
getByID("off").addEventListener("click", () => {
    panel.classList.remove("panel--on");
    reset();
})
// Plays a charming jingle
getByID("music").addEventListener("click", () => {
    if (panel.classList.contains("panel--on")) {
        beep();
    }
})
// If the panel is currently showing a result, sets result to memory
// If the panel is currently displaying an input number, appends the memory value to the end of input number
// If the last input was an operator, pushes the memory value as a new number input
getByID("MRC").addEventListener("click", () => {
    if (panel.innerText === `=${parseFloat(result.toFixed(6))}` ) {
        memory = parseFloat(result.toFixed(6));
        updatePanel("Stored!");
    } else if (panel.innerText !== `=${parseFloat(result.toFixed(6))}` && typeof input[input.length - 1] === "number" && input.join('').length + String(memory).length < 9) {
        input[input.length - 1] += String(memory);
        input[input.length - 1] = parseFloat(input[input.length - 1])
        updatePanel(input.join(''))
    } else if (operators.includes(input[input.length - 1]) && input[input.length - 1].length + String(memory).length < 9) {
        input.push(memory);
        updatePanel(input.join(''))
    }
})
// If the panel is current displaying an input number, sets next operator to +, next input number to memory value
// If the panel is showing a result, sets that result to be the first number input, sets next operator to +, next input number to memory value
getByID("mPlus").addEventListener("click", () => {
    if (panel.innerText !== `=${parseFloat(result.toFixed(6))}` && typeof input[input.length - 1] === "number" && memory !== 0 && input.join('').length + String(memory).length < 8) {
        input.push('+');
        input.push(memory);
        updatePanel(input.join(''))
    } else if (panel.innerText === `=${parseFloat(result.toFixed(6))}` && memory !== 0 && String(result).length + String(memory).length < 8) {
        input[0] = result;
        input.push('+');
        input.push(memory);        
        updatePanel(input.join(''))
    }
})
// If the panel is current displaying an input number, sets next operator to -, next input number to memory value
// If the panel is showing a result, sets that result to be the first number input, sets next operator to -, next input number to memory value
getByID("mMinus").addEventListener("click", () => {
    if (panel.innerText !== `=${parseFloat(result.toFixed(6))}` && typeof input[input.length - 1] === "number" && memory !== 0 && input.join('').length + String(memory).length < 8) {
        input.push('-');
        input.push(memory);
        updatePanel(input.join(''))
    } else if (panel.innerText === `=${parseFloat(result.toFixed(6))}` && memory !== 0 && String(result).length + String(memory).length < 8) {
        input[0] = result;
        input.push('-');
        input.push(memory);
        updatePanel(input.join(''))
    }
})
// Creates an event handler for every number button
// On click:
// If the last input was an operator, creates a new empty input item
// If max display length hasn't been reached, pushes number to input
// Checks if the number has a decimal ending in 0, just to stop parseFloat from removing that
inputButtonNum.forEach((button) => {
    button.addEventListener("click", () => {
        if (input.join('').length < 9) {
            if (operators.includes(input[input.length - 1])) {
                input.push("");
            }
            input[input.length - 1] += String(button.innerText);
            let decCheck = input[input.length - 1].slice(input[input.length - 1].indexOf("."))
            if (!decCheck.startsWith(".")) {
                input[input.length - 1] = parseFloat(input[input.length - 1]);
                updatePanel(input.join(''))
            } else {
                input[input.length - 1] = parseFloat(input[input.length - 1]).toFixed(decCheck.length-1);
                updatePanel(input.join(''))
            }
        }
    })
})
// Checks if the panel is currently displaying a result
// If it is, sets the result as the first item in input
// Sets operator as next item in input
// If the previous item was an operator, overrides that operator
inputButtonOp.forEach((button) => {
    button.addEventListener("click", () => {
        if (panel.innerText === `=${parseFloat(result.toFixed(6))}` && result !== "error") {
            input[0] = result;
            input.push(button.innerText);
            updatePanel(input.join(''))
        } else if (typeof input[input.length - 1] === "number" && input.join('').length < 8) {
            input.push(button.innerText);
            updatePanel(input.join(''))
        } else if (operators.includes(input[input.length - 1]) && input.join('').length < 8) {
            input[input.length -1] = button.innerText;
            updatePanel(input.join(''))
        }
    })
})
// Checks if the current input is a whole number, if it is, adds a decimal to the end
getByID("decimal").addEventListener("click", () => {
    if (typeof input[input.length - 1] === "number" && input[input.length - 1] % 1 == 0) {
        input[input.length - 1] += '.';
        updatePanel(input.join(''))
    } else {
        updatePanel(input.join(''))
    }
})
// If current input is a number, multiplies it by 0.01
getByID("percent").addEventListener("click", () => {
    if (typeof input[input.length - 1] === "number") {
        input[input.length - 1] = 0.01 * input[input.length - 1];
        updatePanel(input.join(''))
    } 
})
// If current input is a number, swaps if it's positive or negative
getByID("plusMinus").addEventListener("click", () => {
    if (typeof input[input.length - 1] === "number") {
        input[input.length - 1] = (0 - input[input.length - 1]);
        updatePanel(input.join(''))
    }
})
// Resets everything EXCEPT memory
getByID("clear").addEventListener("click", () => {
    input.length = 0;
    input[0] = 0;
    updatePanel(input.join(''))
})
// Runs the calculate function, and then resets input
// Checks if the result is Infinity (someone divided by 0), for a funny message
// If a number, updates as expected
// If anything else has happened, returns an error

getByID("equals").addEventListener("click", () => {
    calculate();
    input.length = 0;
    input[0] = 0;
    if (result == "Infinity") {
        panel.innerText = "kaboom!!";
    } else if (typeof result === "number") {
        updatePanel(`=${parseFloat(result.toFixed(6))}`);
    } else {
        updatePanel("error")
    }
})

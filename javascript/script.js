import { getByID, getValueByID, createElementWithText } from "./dom-utils.js";
import { beep } from "./beep.js";

const panel = getByID("panel");
const input = [];
let result = 0;
let memory = 0;
const inputButtonNum = document.querySelectorAll(".input-button--number");
const inputButtonOp = document.querySelectorAll(".input-button--operator");
const operators = ["+", "-", "×", "÷", "√"];

const reset = () => {
    input.length = 0;
    input[0] = 0;
    updatePanel(input.join(''));
    result = 0;
    memory = 0;
}

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

const updatePanel = (toDisplay) => {
    panel.innerText = toDisplay;
}

getByID("onAC").addEventListener("click", () => {
    panel.classList.add("panel--on");
    reset();
})

getByID("off").addEventListener("click", () => {
    panel.classList.remove("panel--on");
    reset();
})

getByID("music").addEventListener("click", () => {
    if (panel.classList.contains("panel--on")) {
        beep();
    }
})

getByID("MRC").addEventListener("click", () => {
    console.log("trying")
    if (panel.innerText === `=${parseFloat(result.toFixed(6))}` ) {
        console.log("1")
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

getByID("decimal").addEventListener("click", () => {
    if (typeof input[input.length - 1] === "number" && input[input.length - 1] % 1 == 0) {
        input[input.length - 1] += '.';
        updatePanel(input.join(''))
    } else {
        updatePanel(input.join(''))
    }
})

getByID("percent").addEventListener("click", () => {
    if (typeof input[input.length - 1] === "number") {
        input[input.length - 1] = 0.01 * input[input.length - 1];
        updatePanel(input.join(''))
    } 
})

getByID("plusMinus").addEventListener("click", () => {
    if (typeof input[input.length - 1] === "number") {
        input[input.length - 1] = (0 - input[input.length - 1]);
        updatePanel(input.join(''))
    }
})

getByID("clear").addEventListener("click", () => {
    input.length = 0;
    input[0] = 0;
    updatePanel(input.join(''))
})

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

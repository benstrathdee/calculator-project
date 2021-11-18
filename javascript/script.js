import { getByID, getValueByID, createElementWithText } from "./dom-utils.js";

const panel = getByID("panel");
let input = "";
let result = 0;
let memory = 0;
const reset = () => {
    panel.innerText = "";
    result = 0;
    memory = 0;
}


// First line:
// A function for turning the display on and set ALL input/memory/result variables to 0 (ON/AC button)
getByID("onAC").addEventListener("click", () => {
    panel.classList.add("panel--on");
    reset();
})

// A function to turn off display and set everything to 0 (OFF button)
getByID("off").addEventListener("click", () => {
    panel.classList.remove("panel--on");
    reset();
})
// A non-functional music button? Maybe make it do a cute alert
const musicAlert = () => {
    // consider looking into if this can make a noise of some sort? Unlikely though
    // window.alert("beep");
}

// Second line:
// A variable to contain a value in memory
// A function to store something in memory (the MRC button)
const storeToMem = () => {
    memory = result;
}
// A function to enter the memory value in the equation (MR button)
// A function to add memory value to current input (M+ button)
// A function to subtract memory value from current input (M- button)

// Numbers block:
// A single function that takes pressed button and inputs it into the input variable (0-9 + . buttons, +/-/ / /*/%/+-/sqrt)
const inputButtons = document.querySelectorAll(".input-button");
inputButtons.forEach((button) => {
    button.addEventListener("click", () => {
        panel.innerText += button.innerText;
    })
})
// A function that sets input variable to empty (C button)``
getByID("clear").addEventListener("click", () => {
    panel.innerText = "";
})
// A function that calculates the result from the input values (= button)

// Backend:
// A variable to store current input (to be displayed)
// A variable to store result (to be displayed)
// A variable to store something in memory (for the M buttons)
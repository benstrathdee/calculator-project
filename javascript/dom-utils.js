export const getByID = (elementID) => {
    return document.getElementById(elementID);
}
export const getValueByID = (elementID) => {
    return document.getElementById(elementID).value;
}
export const createElementWithText = (elementType, text, parent) => {
    const newElem = document.createElement(elementType);
    const textNode = document.createTextNode(text);
    newElem.appendChild(textNode);
    parent.appendChild(newElem);
}
let romanNumbers = {
    "0": '',
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
    "5": "V",
    "6": "VI",
    "7": "VII",
    "8": "VIII",
    "9": "IX",
    "10": "X",
    "20": "XX",
    "30": "XXX",
    "40": "XL",
    "50": "L",
    "60": "LX",
    "70": "LXX",
    "80": "LXXX",
    "90": "XC",
    "100": "C",
    "200": "CC",
    "300": "CCC",
    "400": "CD",
    "500": "D",
    "600": "DC",
    "700": "DCC",
    "800": "DCCC",
    "900": "CM",
    "1000": "M",
    "2000": "MM",
    "3000": "MMM"
}


function convertToRomanNumber() {
    let inputNumber = document.querySelector("#number");
    const stringResult = validateNumber(inputNumber);
    if (stringResult !== undefined) {
        showResult(stringResult);
        return;
    }
    let result = showRomanNumberResult(inputNumber);
    showResult(result);

}


function showRomanNumberResult(inputNumber) {

    let val = inputNumber.value;

    if (romanNumbers[val] !== undefined) {
        return romanNumbers[val];
    }
    let numberLength = val.length;
    let numVal = parseInt(val);
    if (numberLength === 2) {
        let first = getNumberVal(val, 1, numberLength);
        let second = numVal - first;
        return romanNumbers[second.toString()] + romanNumbers[first.toString()];

    }
    if (numberLength === 3) {
        let first = getNumberVal(val, 2, numberLength);
        let second = getNumberVal(val, 1, numberLength) - first;
        let third = numVal - first - second;
        return romanNumbers[third.toString()] + romanNumbers[second.toString()] + romanNumbers[first.toString()];

    }

    if (numberLength === 4) {
        let first = getNumberVal(val, 3, numberLength);
        let second = getNumberVal(val, 2, numberLength) - first;
        let third = getNumberVal(val, 1, numberLength) - first - second;
        let fourth = numVal - third - first - second;
        return romanNumbers[fourth.toString()] + romanNumbers[third.toString()] + romanNumbers[second.toString()] + romanNumbers[first.toString()];

    }

}
function getNumberVal(val, start, end) {
    return parseInt(val.substring(start, end));
}
function validateNumber(inputNumber) {
    if (inputNumber === null || inputNumber.value === "") {
        return "Please enter a valid number.";
    }
    let numValue = parseInt(inputNumber.value);
    if (numValue <= 0) {
        return "Please enter a number greater than or equal to 1.";
    }
    if (numValue >= 4000) {
        return "Please enter a number less than or equal to 3999.";
    }
}
function showResult(message) {
    let output = document.querySelector("#output");
    output.textContent = message;

}
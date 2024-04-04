let romanNumbers = {
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
    "40": "XL",
    "50": "L",
    "90": "XC",
    "100": "C",
    "400": "CD",
    "500": "D",
    "900": "CM",
    "1000": "M"
}


function convertToRomanNumber() {
    initRomanMap();
    let inputNumber = document.querySelector("#number");
    const stringResult = validateNumber(inputNumber);
    if (stringResult !== undefined) {
        showResult(stringResult);
        return;
    }
    dummyFunc(inputNumber);

}

function dummyFunc(inputNumber) {
    let val = inputNumber.value;
    let numberVal = parseInt(val);

    let result = "";
    if (romanNumbers[val] !== undefined) {
        result = romanNumbers[val];
        showResult(result);
        return;
    }

    let lastDigit = parseInt(val.substring(1, val.length));
    let calc = numberVal - lastDigit;
    let key = parseInt(calc.toString().substring(0, calc.toString().length - 1));
    let finalValue = "";
    console.log("KEYY: " + key);
    if(numberVal <=39) {
        dummyFunc2(1,key, "", val, lastDigit, "X");
    }
    if(numberVal >= 40) {
        if (romanNumbers[calc.toString()] != undefined) {
          dummyFunc3(calc,lastDigit)
        }
        dummyFunc2(6,key, "L", val, lastDigit, "X");
    }
    if(numberVal >= 99) {
       
        if (romanNumbers[calc.toString()] != undefined) {
            dummyFunc3(calc,lastDigit)
          }
          dummyFunc2(key+1,key, "XC", val, lastDigit, "");
    }
    if(numberVal >= 100) {
        key = parseInt(calc.toString().substring(0, calc.toString().length - 2));
        if (romanNumbers[calc.toString()] != undefined) {
            dummyFunc3(calc,lastDigit)
          }
          dummyFunc2(1,key, "", val, lastDigit, "C");
    }

}
function dummyFunc3(calc, lastDigit) {
   let result = romanNumbers[calc.toString()] + romanNumbers[lastDigit.toString()];
    showResult(result);
    return;
}
function dummyFunc2(index, key, finalValue, val, lastDigit, concatValue) {
    for (let i = index; i <= key; i++) {
        finalValue += concatValue;
    }
    if (val.endsWith("0")) {
        result = finalValue;
        showResult(result);
        return;
    }
    result = finalValue + romanNumbers[lastDigit.toString()];
    showResult(result);
    return;
}

function initRomanMap() {
    //   romanNumbers.set("1")
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
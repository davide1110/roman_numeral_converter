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
    let inputNumber = document.querySelector("#number");
    const stringResult = validateNumber(inputNumber);
    if (stringResult !== undefined) {
        showResult(stringResult);
        return;
    }
    showRomanNumberResult(inputNumber);

}

function showRomanNumberResult(inputNumber) {
    let val = inputNumber.value;
    let numberVal = parseInt(val);
    let numberLength = val.length;
    let numberVal1 = getNumberVal(val, numberLength);


    let result = "";
    if (romanNumbers[val] !== undefined) {
        showRomanNumberFromKey(val)
        return;
    }

    let lastDigit = parseInt(val.substring(1, val.length));
    let calc = numberVal - lastDigit;
    let key = getKey(numberVal1);
    if (numberVal1 <= 39) {
        let finalValue = getFinalValue(calc, lastDigit);
        showRomanNumberFromCalc(1, key, finalValue, val, lastDigit, "X");
        return;
    }
    if (numberVal1 >= 40 && numberVal1 <= 89) {
        let finalValue = getFinalValue(calc, lastDigit);
        if (romanNumbers[numberVal1.toString()] != undefined) {
            showRomanNumberFromKeys(calc, lastDigit, finalValue)
            return;
        }
        showRomanNumberFromCalc(6, key, finalValue, val, lastDigit, "X");
    }
    if (numberVal1 >= 90 && numberVal1 <= 99) {
        let finalValue = getFinalValue(calc, lastDigit);
        if (romanNumbers[numberVal1.toString()] != undefined) {
            showRomanNumberFromKeys(calc, lastDigit, finalValue)
            return;
        }
        showRomanNumberFromCalc(key + 1, key, finalValue, val, lastDigit, "");
    }

}

function getNumberVal(val, numberLength) {
    return parseInt(val.substring((numberLength - 2), numberLength));
}
function getKey(calc) {
    let calcString = calc.toString();
    let start = 0;
    if (calcString.length > 2) start = 1;
    let end = calcString.length - 1;
    let trimmedCalcString = calcString.substring(start, end);
    return parseInt(trimmedCalcString);
}

function getFinalValue(calc, lastDigit) {
    let calcString = calc.toString();
    let val = "";
    if (calc >= 200 && calc <= 399) {
        let key = parseInt(calcString.substring(0, calcString.length - 2));
        for (let i = 1; i <= key; i++) {
            val += "C";
        }
        /* if(romanNumbers[lastDigit.toString()] !== undefined) {
            return val + romanNumbers[lastDigit.toString()];
        } */
        return getFinalValueWithNumBetweenFiftyAndNineteenine(lastDigit, val);

    }
    if (lastDigit >= 200 && lastDigit <= 399 && calcString.length > 3) {
        let key = parseInt(lastDigit.toString().substring(0, lastDigit.toString().length - 2));
        val = "M";
        for (let i = 1; i <= key; i++) {
            val += "C";
        }
        return getFinalValueWithNumBetweenFiftyAndNineteenine(lastDigit, val);

    }
    if (romanNumbers[calcString] !== undefined && calcString.length > 2) {
        if (lastDigit !== 0 && lastDigit !== undefined) {
            let middle = parseInt(lastDigit.toString().substring(1, lastDigit.toString().length));
            let diff = lastDigit - middle;
            if (romanNumbers[diff.toString()] === undefined) {
                return getFinalValueWithNumBetweenFiftyAndNineteenine(diff, calcString);
            }
            return romanNumbers[calcString] + romanNumbers[diff.toString()];
        }
        return romanNumbers[calcString];
    }
    return getFinalValueWithNumBetweenFiftyAndNineteenine(calc, undefined, lastDigit);


    function getFinalValueWithNumBetweenFiftyAndNineteenine(calc, key, lastDigit) {
       //TODO: handle numbers with 3 digit with substring
        let val = "";
        if (romanNumbers[key] !== undefined) val = romanNumbers[key];
        if (key !== undefined && romanNumbers[key] === undefined) val = key;

        if(calc >= 40 && calc <= 50) {
            return val + "XL";
        }
        if (calc >= 50 && calc <= 89) {
            return val + "L";
        }
        if (calc >= 90 && calc <= 99) {
            return val + "XC";
        }
        if (calc >= 500 && calc <= 890) {
            return "D" + getFinalValueBetweenFiveHundredAndEighteenNineHundred(calc, lastDigit);
        }
        return val;
    }
}

function getFinalValueBetweenFiveHundredAndEighteenNineHundred(calc, lastDigit) {
    let value = "";
    if (calc >= 600 && calc <= 699) value = "C";
    if (calc >= 700 && calc <= 799) value = "CC";
    if (calc >= 800 && calc <= 890) value = "CCC";
    if (lastDigit >= 40 && lastDigit <= 50) value += "XL";
    if (lastDigit >= 50 && lastDigit <= 89) value += "L";
    if (lastDigit >= 89 && lastDigit <= 99) value += "XC";
    return value;
}
function showRomanNumberFromCalc(index, key, finalValue, val, lastDigit, concatValue) {
    let result = "";
    for (let i = index; i <= key; i++) {
        finalValue += concatValue;
    }
    if (val.endsWith("0")) {
        result = finalValue;
        showResult(result);
        return;
    }
    if (lastDigit.toString().length === 2) {
        let middle = parseInt(lastDigit.toString().substring(1, lastDigit.toString().length));
        result = finalValue + romanNumbers[middle.toString()];
        showResult(result);
        return;
    }
    if (lastDigit.toString().length > 2) {
        let middle = parseInt(lastDigit.toString().substring(2, lastDigit.toString().length));
        result = finalValue + romanNumbers[middle.toString()];
        showResult(result);
        return;
    }
    result = finalValue + romanNumbers[lastDigit.toString()];
    showResult(result);
    return;

}

function showRomanNumberFromKey(val) {
    const result = romanNumbers[val];
    showResult(result);
}

function showRomanNumberFromKeys(calc, middleDigit, lastDigit) {
    let result = "";
    if (lastDigit !== 0 && lastDigit !== undefined && typeof lastDigit !== "string") {
        result = romanNumbers[calc.toString()] +
            romanNumbers[middleDigit.toString()] + romanNumbers[lastDigit.toString()];
        showResult(result);
        return;
    }

    if (romanNumbers[calc.toString()] === undefined) {
        result = lastDigit +
            romanNumbers[middleDigit.toString()];

        showResult(result);
        return;

    }

    result = romanNumbers[calc.toString()] +
        romanNumbers[middleDigit.toString()];

    showResult(result);
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
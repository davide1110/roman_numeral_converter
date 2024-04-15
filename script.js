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
     if(numberVal1 <=39) {
        let finalValue = getFinalValue(calc);
        showRomanNumberFromCalc(1,key, finalValue, val, lastDigit, "X");
        return;
    }
    if(numberVal1 >= 40 && numberVal1 <= 89) {
        let finalValue = getFinalValue(calc, lastDigit);
        if (romanNumbers[numberVal1.toString()] != undefined) {
            showRomanNumberFromKeys(calc,lastDigit)
            return;
        }
        showRomanNumberFromCalc(6,key, finalValue, val, lastDigit, "X");
    }
    if(numberVal1 >= 90 && numberVal1 <= 99) {
        let finalValue = getFinalValue(calc);
        if (romanNumbers[numberVal1.toString()] != undefined) {
            showRomanNumberFromKeys(calc,lastDigit)
            return;
          }
          showRomanNumberFromCalc(key+1,key, finalValue, val, lastDigit, "");
    }

}

function getNumberVal(val, numberLength) {
    return parseInt(val.substring((numberLength - 2),numberLength));
}
function getKey(calc) {
    let calcString = calc.toString();
    let start = 0;
    if(calcString.length > 2) start = 1;
    let end = calcString.length - 1;
    let trimmedCalcString = calcString.substring(start,end);
    return parseInt(trimmedCalcString);
}

function getFinalValue(calc, lastDigit) {
   let calcString = calc.toString();
   if(romanNumbers[calcString] !== undefined) {
      if(lastDigit !== 0) {
        let middle = parseInt(lastDigit.toString().substring(1, lastDigit.toString().length));
        let diff = lastDigit - middle;
        if(romanNumbers[diff.toString()] === undefined) {
            if(diff >= 50 && diff <= 89) {
                return romanNumbers[calcString] + "L";
             }
        }
        return romanNumbers[calcString] + romanNumbers[diff.toString()];
      }
      return romanNumbers[calcString];
   }
    if(calc >= 50 && calc <= 89) {
      return "L";
   }

   
  return "";
}

function showRomanNumberFromCalc(index, key, finalValue, val, lastDigit, concatValue) {
    for (let i = index; i <= key; i++) {
        finalValue += concatValue;
    }
    if (val.endsWith("0")) {
        result = finalValue;
        showResult(result);
        return;
    }
    if(lastDigit.toString().length > 1) {
    let middle = parseInt(lastDigit.toString().substring(1, lastDigit.toString().length));
    let diff = lastDigit - middle;
    //result = finalValue + romanNumbers[lastDigit.toString()];
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
function showRomanNumberFromKeys(calc, lastDigit) {
    const result = romanNumbers[calc.toString()] + romanNumbers[lastDigit.toString()];
    showResult(result);
 }

 function showRomanNumberFromKeys(calc, middleDigit, lastDigit) {
    let result = "";
    if(lastDigit !== 0 && lastDigit !== undefined) {
        result = romanNumbers[calc.toString()] +
        romanNumbers[middleDigit.toString()]+ romanNumbers[lastDigit.toString()];
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
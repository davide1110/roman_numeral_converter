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
    let key = getKey(calc);
  //  let finalValue = "";
    console.log("KEYY: " + key);
    
   /*  if(finalDigitNumber <= 39) {
        concatValue = "X";
        finalValue="C";
     
        showRomanNumberFromCalc(1,key, finalValue, val, lastDigit, concatValue);
        return;

      
    } */
    if(numberVal1 <=39) {
        let finalValue = getFinalValue();
        showRomanNumberFromCalc(1,key, "", val, lastDigit, "X");
        return;
    }
    if(numberVal >= 40 && numberVal <= 89) {
        if (romanNumbers[calc.toString()] != undefined) {
            showRomanNumberFromKeys(calc,lastDigit)
            return;
        }
        showRomanNumberFromCalc(6,key, "L", val, lastDigit, "X");
    }
    if(numberVal >= 90 && numberVal <= 99) {
       
        if (romanNumbers[calc.toString()] != undefined) {
            showRomanNumberFromKeys(calc,lastDigit)
            return;
          }
          showRomanNumberFromCalc(key+1,key, "XC", val, lastDigit, "");
    }
    if(numberVal >= 100) {
        key = parseInt(calc.toString().substring(0, calc.toString().length - 2));
        let numberValString = numberVal.toString();
        let finalDigitNumber = parseInt(numberValString.substring(1, numberValString.length));
        let finalValue = "";
        if(finalDigitNumber <= 39) {
            concatValue = "X";
            finalValue="C";
            key = numberValString.substring(1, numberValString.length-1);
            //key = key.replace("0","");
            showRomanNumberFromCalc(1,key, finalValue, val, lastDigit, concatValue);
            return;

          
        }
        if(finalDigitNumber >= 40 && finalDigitNumber <= 89) {
            let middle = parseInt(lastDigit.toString().substring(1, lastDigit.toString().length));
            let diff = lastDigit - middle;
            if (romanNumbers[diff.toString()] != undefined
         && romanNumbers[calc.toString()] != undefined) {

               // let middleDigit = last
                showRomanNumberFromKeys(calc,diff, middle)
                return;
            }
            showRomanNumberFromCalc(6,key, "L", val, lastDigit, "X");
            return;
        }
        if(finalDigitNumber >= 90 && finalDigitNumber <= 99) {
           
                let middle = parseInt(lastDigit.toString().substring(1, lastDigit.toString().length));
                let diff = lastDigit - middle;
                if (romanNumbers[diff.toString()] != undefined
             && romanNumbers[calc.toString()] != undefined) {
    
                   // let middleDigit = last
                    showRomanNumberFromKeys(calc,diff, middle)
                    return;
                }
              showRomanNumberFromCalc(key+1,key, "XC", val, lastDigit, "");
              return;
        }
   
        if (romanNumbers[calc.toString()] != undefined) {
            showRomanNumberFromKeys(calc,lastDigit)
            return;
          }
          showRomanNumberFromCalc(1,key, finalValue, val, lastDigit, concatValue);
    }

}

function getNumberVal(val, numberLength) {
    return parseInt(val.substring(0, (numberLength - (numberLength - 2))));
}
function getKey(calc) {
    let calcString = calc.toString();
    let trimmedCalcString = calcString.substring(0, (calcString.length - (calcString.length - 1)));
    return parseInt(trimmedCalcString);
}

function getFinalValue() {

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
    if(lastDigit !== 0) {
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
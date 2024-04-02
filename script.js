


function convertToRomanNumber() {
    let inputNumber = document.querySelector("#number");
    const stringResult = validateNumber(inputNumber);
     if(stringResult !== undefined) {
        showResult(stringResult);
        return;
     }
     let val = inputNumber.value;
     showResult(val);

   
}


function validateNumber(inputNumber) {
    if(inputNumber === null || inputNumber.value === "") {
        return "Please enter a valid number.";
    }
    let numValue = parseInt(inputNumber.value);
    if(numValue <= 0) {
        return "Please enter a number greater than or equal to 1.";    
    }
    if(numValue >= 4000) {
        return "Please enter a number less than or equal to 3999.";
    }
}
function showResult(message) {
  let output = document.querySelector("#output");
  output.textContent = message;
 
}
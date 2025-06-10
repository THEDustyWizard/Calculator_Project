let currentInput = '';
let operator = '';
let previousInput = '';

const display = document.getElementById('result');

function appendCharacter(char) {
    if (char === '.' && currentInput.includes('.')) return;
    currentInput += char;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || previousInput || '0';
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function setOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculateResult(); // Calculate if there's a pending operation
        }
        previousInput = currentInput;
        currentInput = '';
    }
    operator = op;
    // Optionally, update display to show operator or previousInput + operator
    // display.value = previousInput + ' ' + operator;
}

function calculateResult() {
    if (previousInput === '' || currentInput === '' || operator === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        alert('Invalid input');
        clearDisplay();
        return;
    }

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

// Placeholder for Financial Functions
function calculateSimpleInterest() {
    const principal = parseFloat(prompt("Enter Principal Amount:"));
    const rate = parseFloat(prompt("Enter Annual Interest Rate (e.g., 0.05 for 5%):"));
    const time = parseFloat(prompt("Enter Time (in years):"));

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal < 0 || rate < 0 || time < 0) {
        alert("Invalid input for Simple Interest calculation.");
        return;
    }

    const interest = principal * rate * time;
    const totalAmount = principal + interest;
    currentInput = totalAmount.toFixed(2);
    operator = '';
    previousInput = `SI: P=${principal}, R=${rate*100}%, T=${time}yrs`;
    updateDisplay();
    previousInput = ''; // Clear for next standard calculation
}

function calculateCompoundInterest() {
    const principal = parseFloat(prompt("Enter Principal Amount:"));
    const rate = parseFloat(prompt("Enter Annual Interest Rate (e.g., 0.05 for 5%):"));
    const time = parseFloat(prompt("Enter Time (in years):"));
    const n = parseInt(prompt("Enter number of times interest is compounded per year:"));

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || isNaN(n) || principal < 0 || rate < 0 || time < 0 || n <= 0) {
        alert("Invalid input for Compound Interest calculation.");
        return;
    }

    const amount = principal * Math.pow((1 + rate / n), (n * time));
    currentInput = amount.toFixed(2);
    operator = '';
    previousInput = `CI: P=${principal}, R=${rate*100}%, T=${time}yrs, N=${n}`;
    updateDisplay();
    previousInput = '';
}

function calculateFutureValue() {
    // FV = PV * (1 + r)^n
    const presentValue = parseFloat(prompt("Enter Present Value (PV):"));
    const rate = parseFloat(prompt("Enter Interest Rate per period (e.g., 0.05 for 5%):"));
    const periods = parseFloat(prompt("Enter Number of Periods:"));

    if (isNaN(presentValue) || isNaN(rate) || isNaN(periods) || presentValue < 0 || rate < 0 || periods < 0) {
        alert("Invalid input for Future Value calculation.");
        return;
    }

    const futureValue = presentValue * Math.pow((1 + rate), periods);
    currentInput = futureValue.toFixed(2);
    operator = '';
    previousInput = `FV: PV=${presentValue}, R=${rate*100}%, N=${periods}`;
    updateDisplay();
    previousInput = '';
}

function calculatePresentValue() {
    // PV = FV / (1 + r)^n
    const futureValue = parseFloat(prompt("Enter Future Value (FV):"));
    const rate = parseFloat(prompt("Enter Interest Rate per period (e.g., 0.05 for 5%):"));
    const periods = parseFloat(prompt("Enter Number of Periods:"));

    if (isNaN(futureValue) || isNaN(rate) || isNaN(periods) || futureValue < 0 || rate < 0 || periods < 0) {
        alert("Invalid input for Present Value calculation.");
        return;
    }

    const presentValue = futureValue / Math.pow((1 + rate), periods);
    currentInput = presentValue.toFixed(2);
    operator = '';
    previousInput = `PV: FV=${futureValue}, R=${rate*100}%, N=${periods}`;
    updateDisplay();
    previousInput = '';
}

// Initial display update
updateDisplay(); 
function generateFibonacci(terms) {
    if (terms <= 0) return [];
    if (terms === 1) return [0];
    const sequence = [0, 1];
    for (let i = 2; i < terms; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function validateInput(input) {
    const num = parseInt(input);
    return !isNaN(num) && num > 0 && num <= 100;
}

function displayFibonacciResult() {
    const inputElement = document.getElementById('fibInput');
    const resultElement = document.getElementById('fibResult');
    
    if (!inputElement || !resultElement) return;
    
    const inputValue = inputElement.value;
    
    if (!validateInput(inputValue)) {
        resultElement.textContent = 'Please enter a valid number between 1 and 100';
        return;
    }
    
    const n = parseInt(inputValue);
    const fibonacciSequence = calculateFibonacci(n);
    resultElement.textContent = `Fibonacci sequence (${n} numbers): ${fibonacciSequence.join(', ')}`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateFibonacci, validateInput };
}function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

console.log(fibonacci(10));
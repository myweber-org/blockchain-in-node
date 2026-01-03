function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let fibSequence = [0, 1];
    
    for (let i = 2; i < n; i++) {
        fibSequence.push(fibSequence[i - 1] + fibSequence[i - 2]);
    }
    
    return fibSequence;
}

function displayFibonacciResult() {
    const input = document.getElementById('fibInput');
    const resultElement = document.getElementById('fibResult');
    
    if (!input || !resultElement) return;
    
    const n = parseInt(input.value);
    
    if (isNaN(n) || n < 1) {
        resultElement.textContent = 'Please enter a positive integer';
        return;
    }
    
    const sequence = calculateFibonacci(n);
    resultElement.textContent = sequence.join(', ');
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateFibonacci };
}function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function validateInput(input) {
    const num = parseInt(input);
    if (isNaN(num) || num < 1 || num > 100) {
        throw new Error('Input must be a number between 1 and 100');
    }
    return num;
}

function displayFibonacciResult(inputElement, outputElement) {
    try {
        const n = validateInput(inputElement.value);
        const result = calculateFibonacci(n);
        outputElement.textContent = result.join(', ');
    } catch (error) {
        outputElement.textContent = 'Error: ' + error.message;
    }
}
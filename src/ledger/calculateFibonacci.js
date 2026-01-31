function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        const nextTerm = sequence[i - 1] + sequence[i - 2];
        sequence.push(nextTerm);
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

function displayFibonacci() {
    const input = document.getElementById('fibInput');
    const result = document.getElementById('fibResult');
    
    if (!input || !result) return;
    
    const n = parseInt(input.value);
    if (isNaN(n) || n < 1) {
        result.textContent = 'Please enter a positive integer';
        return;
    }
    
    const fibSequence = calculateFibonacci(n);
    result.textContent = `Fibonacci sequence: ${fibSequence.join(', ')}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('calculateBtn');
    if (button) {
        button.addEventListener('click', displayFibonacci);
    }
});function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= n) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}

function isFibonacciNumber(num) {
    if (num < 0) return false;
    if (num === 0 || num === 1) return true;
    
    let a = 0, b = 1;
    while (b < num) {
        const temp = b;
        b = a + b;
        a = temp;
    }
    return b === num;
}

module.exports = { calculateFibonacci, isFibonacciNumber };
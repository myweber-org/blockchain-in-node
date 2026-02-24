function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
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

function displayFibonacci() {
    const input = document.getElementById('fibInput');
    const resultDiv = document.getElementById('fibResult');
    
    const n = parseInt(input.value);
    if (isNaN(n) || n < 1) {
        resultDiv.textContent = 'Please enter a positive integer';
        return;
    }
    
    const sequence = calculateFibonacci(n);
    resultDiv.textContent = `Fibonacci sequence (${n} terms): ${sequence.join(', ')}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('calculateBtn');
    if (button) {
        button.addEventListener('click', displayFibonacci);
    }
});
function calculateFibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = calculateFibonacci(n - 1, memo) + calculateFibonacci(n - 2, memo);
    return memo[n];
}

module.exports = calculateFibonacci;function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= n) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}function calculateFibonacci(limit) {
    const sequence = [0, 1];
    
    if (limit <= 0) {
        return [];
    }
    
    if (limit === 1) {
        return [0];
    }
    
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= limit) {
        const nextNumber = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        sequence.push(nextNumber);
    }
    
    return sequence;
}

function isFibonacciNumber(num) {
    if (num < 0) return false;
    
    const check1 = 5 * num * num + 4;
    const check2 = 5 * num * num - 4;
    
    const isPerfectSquare = (n) => {
        const sqrt = Math.sqrt(n);
        return sqrt === Math.floor(sqrt);
    };
    
    return isPerfectSquare(check1) || isPerfectSquare(check2);
}

module.exports = {
    calculateFibonacci,
    isFibonacciNumber
};function calculateFibonacci(limit) {
    const sequence = [0, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= limit) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

function printFibonacciSequence(limit) {
    for (let i = 0; i <= limit; i++) {
        console.log(`Fibonacci(${i}) = ${fibonacci(i)}`);
    }
}

if (require.main === module) {
    const limit = 10;
    printFibonacciSequence(limit);
}

module.exports = { fibonacci, printFibonacciSequence };
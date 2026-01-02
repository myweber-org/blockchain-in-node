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
}
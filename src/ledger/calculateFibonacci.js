function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        const next = sequence[i - 1] + sequence[i - 2];
        sequence.push(next);
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
    result.textContent = fibSequence.join(', ');
}function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib;
}
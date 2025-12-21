function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i-1] + fib[i-2]);
    }
    return fib;
}

function displayFibonacci() {
    const input = document.getElementById('fibInput');
    const result = document.getElementById('fibResult');
    
    if (!input || !result) return;
    
    const n = parseInt(input.value);
    if (isNaN(n) || n < 1) {
        result.textContent = 'Please enter a positive number';
        return;
    }
    
    const sequence = calculateFibonacci(n);
    result.textContent = sequence.join(', ');
}
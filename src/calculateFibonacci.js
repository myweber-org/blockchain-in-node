function calculateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

function displayFibonacci() {
    const input = document.getElementById('fibInput');
    const resultDiv = document.getElementById('fibResult');
    
    const n = parseInt(input.value);
    if (isNaN(n) || n < 1 || n > 50) {
        resultDiv.textContent = 'Please enter a number between 1 and 50';
        return;
    }
    
    const fibSequence = calculateFibonacci(n);
    resultDiv.textContent = `Fibonacci sequence (${n} terms): ${fibSequence.join(', ')}`;
}
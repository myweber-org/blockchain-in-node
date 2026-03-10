function calculateFibonacci(n) {
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
    if (isNaN(num) || num < 1 || num > 100) {
        throw new Error('Input must be a number between 1 and 100');
    }
    return num;
}

function displayFibonacciSequence(limit) {
    try {
        const n = validateInput(limit);
        const result = calculateFibonacci(n);
        console.log(`Fibonacci sequence (${n} terms):`, result);
        return result;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

module.exports = { calculateFibonacci, validateInput, displayFibonacciSequence };
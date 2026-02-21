function calculateCircleArea(radius) {
    if (radius <= 0) {
        throw new Error('Radius must be a positive number');
    }
    const area = Math.PI * Math.pow(radius, 2);
    return parseFloat(area.toFixed(2));
}

function validateAndCalculate() {
    const input = document.getElementById('radiusInput').value;
    const resultElement = document.getElementById('result');
    
    try {
        const radius = parseFloat(input);
        if (isNaN(radius)) {
            throw new Error('Please enter a valid number');
        }
        
        const area = calculateCircleArea(radius);
        resultElement.textContent = `Area: ${area}`;
        resultElement.className = 'success';
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
        resultElement.className = 'error';
    }
}
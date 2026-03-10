function calculateCircleArea(radius) {
    if (typeof radius !== 'number' || radius < 0) {
        throw new Error('Radius must be a non-negative number');
    }
    const area = Math.PI * radius * radius;
    return parseFloat(area.toFixed(2));
}
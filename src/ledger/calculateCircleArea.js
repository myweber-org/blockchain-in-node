function calculateCircleArea(radius) {
    if (radius < 0) {
        throw new Error('Radius cannot be negative');
    }
    return Math.PI * radius * radius;
}
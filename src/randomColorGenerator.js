function generateRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function generateRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColor(format = 'hex') {
    if (format.toLowerCase() === 'rgb') {
        return generateRandomRGBColor();
    }
    return generateRandomHexColor();
}

export { generateRandomColor, generateRandomHexColor, generateRandomRGBColor };
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (unit.toLowerCase() === 'c') {
        return celsiusToFahrenheit(value);
    } else if (unit.toLowerCase() === 'f') {
        return fahrenheitToCelsius(value);
    } else {
        throw new Error('Invalid unit. Use "C" for Celsius or "F" for Fahrenheit.');
    }
}

function formatTemperature(value, unit) {
    const converted = convertTemperature(value, unit);
    const targetUnit = unit.toLowerCase() === 'c' ? 'F' : 'C';
    return `${value}°${unit.toUpperCase()} = ${converted.toFixed(2)}°${targetUnit}`;
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature,
    formatTemperature
};
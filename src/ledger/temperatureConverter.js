function celsiusToFahrenheit(celsius) {
    if (typeof celsius !== 'number' || isNaN(celsius)) {
        throw new Error('Input must be a valid number');
    }
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    if (typeof fahrenheit !== 'number' || isNaN(fahrenheit)) {
        throw new Error('Input must be a valid number');
    }
    return (fahrenheit - 32) * 5/9;
}

function formatTemperature(value, unit) {
    const validUnits = ['C', 'F'];
    if (!validUnits.includes(unit.toUpperCase())) {
        throw new Error('Unit must be "C" or "F"');
    }
    return `${value.toFixed(1)}°${unit.toUpperCase()}`;
}

export { celsiusToFahrenheit, fahrenheitToCelsius, formatTemperature };function celsiusToFahrenheit(celsius) {
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

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature
};
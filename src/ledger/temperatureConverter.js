function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (unit.toLowerCase() === 'c') {
        return {
            value: celsiusToFahrenheit(value),
            unit: 'F'
        };
    } else if (unit.toLowerCase() === 'f') {
        return {
            value: fahrenheitToCelsius(value),
            unit: 'C'
        };
    }
    throw new Error('Invalid unit. Use "C" for Celsius or "F" for Fahrenheit.');
}

function formatTemperature(value, unit) {
    const symbol = unit === 'C' ? '°C' : '°F';
    return `${value.toFixed(1)}${symbol}`;
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature,
    formatTemperature
};
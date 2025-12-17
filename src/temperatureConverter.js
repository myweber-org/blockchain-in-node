function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius
};function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === 'C' && toUnit === 'F') {
        return celsiusToFahrenheit(value);
    } else if (fromUnit === 'F' && toUnit === 'C') {
        return fahrenheitToCelsius(value);
    } else if (fromUnit === toUnit) {
        return value;
    } else {
        throw new Error('Unsupported temperature conversion');
    }
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature
};function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (unit === 'C') {
        return {
            celsius: value,
            fahrenheit: celsiusToFahrenheit(value)
        };
    } else if (unit === 'F') {
        return {
            celsius: fahrenheitToCelsius(value),
            fahrenheit: value
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
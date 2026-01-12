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
};function celsiusToFahrenheit(celsius) {
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
};function celsiusToFahrenheit(celsius) {
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

function convertTemperature(value, unit) {
    const validUnits = ['C', 'F'];
    unit = unit.toUpperCase();
    
    if (!validUnits.includes(unit)) {
        throw new Error('Unit must be "C" for Celsius or "F" for Fahrenheit');
    }
    
    if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Value must be a valid number');
    }
    
    if (unit === 'C') {
        return {
            celsius: value,
            fahrenheit: celsiusToFahrenheit(value),
            originalUnit: 'C'
        };
    } else {
        return {
            celsius: fahrenheitToCelsius(value),
            fahrenheit: value,
            originalUnit: 'F'
        };
    }
}

export { celsiusToFahrenheit, fahrenheitToCelsius, convertTemperature };
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (unit === 'C') {
        return celsiusToFahrenheit(value);
    } else if (unit === 'F') {
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

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function fahrenheitToKelvin(fahrenheit) {
    return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return celsiusToFahrenheit(kelvinToCelsius(kelvin));
}

function convertTemperature(value, fromUnit, toUnit) {
    const units = {
        'C': 'celsius',
        'F': 'fahrenheit', 
        'K': 'kelvin'
    };
    
    if (!units[fromUnit] || !units[toUnit]) {
        throw new Error('Invalid temperature unit');
    }
    
    if (fromUnit === toUnit) {
        return value;
    }
    
    const conversionFunction = `${units[fromUnit]}To${units[toUnit].charAt(0).toUpperCase() + units[toUnit].slice(1)}`;
    
    if (typeof window[conversionFunction] === 'function') {
        return window[conversionFunction](value);
    }
    
    throw new Error(`Conversion from ${fromUnit} to ${toUnit} not supported`);
}

module.exports = {
    celsiusToFahrenheit,
    celsiusToKelvin,
    fahrenheitToCelsius,
    fahrenheitToKelvin,
    kelvinToCelsius,
    kelvinToFahrenheit,
    convertTemperature
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

function convertTemperature(value, unit) {
    if (unit.toLowerCase() === 'c') {
        return celsiusToFahrenheit(value);
    } else if (unit.toLowerCase() === 'f') {
        return fahrenheitToCelsius(value);
    } else {
        throw new Error('Invalid unit. Use "C" for Celsius or "F" for Fahrenheit.');
    }
}

function formatTemperature(value, originalUnit) {
    const convertedUnit = originalUnit.toLowerCase() === 'c' ? 'F' : 'C';
    return `${value.toFixed(2)}°${convertedUnit}`;
}

function validateTemperatureInput(value) {
    if (typeof value !== 'number' || isNaN(value)) {
        return false;
    }
    return true;
}

function temperatureConversionHandler(inputValue, inputUnit) {
    if (!validateTemperatureInput(inputValue)) {
        return 'Invalid temperature value';
    }
    
    try {
        const convertedValue = convertTemperature(inputValue, inputUnit);
        return formatTemperature(convertedValue, inputUnit);
    } catch (error) {
        return error.message;
    }
}

export {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature,
    temperatureConversionHandler
};function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5/9 + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

function convertTemperature(value, fromUnit, toUnit) {
    const units = ['C', 'F', 'K'];
    if (!units.includes(fromUnit) || !units.includes(toUnit)) {
        throw new Error('Invalid temperature unit');
    }
    
    if (fromUnit === toUnit) return value;
    
    if (fromUnit === 'C') {
        if (toUnit === 'F') return celsiusToFahrenheit(value);
        if (toUnit === 'K') return celsiusToKelvin(value);
    }
    
    if (fromUnit === 'F') {
        if (toUnit === 'C') return fahrenheitToCelsius(value);
        if (toUnit === 'K') return fahrenheitToKelvin(value);
    }
    
    if (fromUnit === 'K') {
        if (toUnit === 'C') return kelvinToCelsius(value);
        if (toUnit === 'F') return kelvinToFahrenheit(value);
    }
}

export {
    celsiusToFahrenheit,
    celsiusToKelvin,
    fahrenheitToCelsius,
    fahrenheitToKelvin,
    kelvinToCelsius,
    kelvinToFahrenheit,
    convertTemperature
};function celsiusToFahrenheit(celsius) {
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

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature
};
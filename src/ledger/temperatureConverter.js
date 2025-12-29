function celsiusToFahrenheit(celsius) {
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
    
    if (fromUnit === toUnit) {
        return value;
    }
    
    const conversionMap = {
        'C_F': celsiusToFahrenheit,
        'C_K': celsiusToKelvin,
        'F_C': fahrenheitToCelsius,
        'F_K': fahrenheitToKelvin,
        'K_C': kelvinToCelsius,
        'K_F': kelvinToFahrenheit
    };
    
    const conversionKey = `${fromUnit}_${toUnit}`;
    const conversionFunction = conversionMap[conversionKey];
    
    if (!conversionFunction) {
        throw new Error('Unsupported conversion');
    }
    
    return conversionFunction(value);
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
    
    if (fromUnit === toUnit) {
        return value;
    }
    
    const conversionMap = {
        'C_F': celsiusToFahrenheit,
        'C_K': celsiusToKelvin,
        'F_C': fahrenheitToCelsius,
        'F_K': fahrenheitToKelvin,
        'K_C': kelvinToCelsius,
        'K_F': kelvinToFahrenheit
    };
    
    const conversionKey = `${fromUnit}_${toUnit}`;
    const conversionFunction = conversionMap[conversionKey];
    
    if (conversionFunction) {
        return conversionFunction(value);
    } else {
        throw new Error('Unsupported temperature conversion');
    }
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

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === 'C' && toUnit === 'F') {
        return celsiusToFahrenheit(value);
    } else if (fromUnit === 'F' && toUnit === 'C') {
        return fahrenheitToCelsius(value);
    } else if (fromUnit === toUnit) {
        return value;
    }
    throw new Error('Unsupported temperature conversion');
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature
};
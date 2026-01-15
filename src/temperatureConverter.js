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
    const conversions = {
        'C': {
            'F': celsiusToFahrenheit,
            'K': celsiusToKelvin,
            'C': (x) => x
        },
        'F': {
            'C': fahrenheitToCelsius,
            'K': fahrenheitToKelvin,
            'F': (x) => x
        },
        'K': {
            'C': kelvinToCelsius,
            'F': kelvinToFahrenheit,
            'K': (x) => x
        }
    };

    if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
        return conversions[fromUnit][toUnit](value);
    }
    
    throw new Error('Invalid temperature units provided');
}

module.exports = {
    celsiusToFahrenheit,
    celsiusToKelvin,
    fahrenheitToCelsius,
    fahrenheitToKelvin,
    kelvinToCelsius,
    kelvinToFahrenheit,
    convertTemperature
};
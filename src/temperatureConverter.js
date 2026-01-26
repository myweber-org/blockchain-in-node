function celsiusToFahrenheit(celsius) {
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
  if (unit.toLowerCase() === 'c') {
    return {
      celsius: value,
      fahrenheit: celsiusToFahrenheit(value),
      kelvin: value + 273.15
    };
  } else if (unit.toLowerCase() === 'f') {
    const celsius = fahrenheitToCelsius(value);
    return {
      celsius: celsius,
      fahrenheit: value,
      kelvin: celsius + 273.15
    };
  } else if (unit.toLowerCase() === 'k') {
    const celsius = value - 273.15;
    return {
      celsius: celsius,
      fahrenheit: celsiusToFahrenheit(celsius),
      kelvin: value
    };
  }
  throw new Error('Invalid temperature unit. Use C, F, or K.');
}

function formatTemperature(value, decimals = 1) {
  return Number(value.toFixed(decimals));
}

export {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  convertTemperature,
  formatTemperature
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

    const conversionKey = `${fromUnit}to${toUnit}`;
    const conversionFunctions = {
        'CtoF': celsiusToFahrenheit,
        'CtoK': celsiusToKelvin,
        'FtoC': fahrenheitToCelsius,
        'FtoK': fahrenheitToKelvin,
        'KtoC': kelvinToCelsius,
        'KtoF': kelvinToFahrenheit
    };

    if (conversionFunctions[conversionKey]) {
        return conversionFunctions[conversionKey](value);
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
};
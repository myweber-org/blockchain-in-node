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
};
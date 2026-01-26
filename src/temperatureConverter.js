function celsiusToFahrenheit(celsius) {
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
      originalUnit: 'C'
    };
  } else if (unit.toLowerCase() === 'f') {
    return {
      celsius: fahrenheitToCelsius(value),
      fahrenheit: value,
      originalUnit: 'F'
    };
  } else {
    throw new Error('Invalid unit. Use "C" for Celsius or "F" for Fahrenheit.');
  }
}

function formatTemperature(temp, unit) {
  const symbol = unit === 'C' ? '°C' : '°F';
  return `${temp.toFixed(2)}${symbol}`;
}

module.exports = {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  convertTemperature,
  formatTemperature
};
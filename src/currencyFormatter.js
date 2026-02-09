const currencyFormatter = (value, currency = 'USD', locale = 'en-US') => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(value);
};

const formatCurrencyWithSymbol = (value, currencyCode) => {
  const symbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥'
  };

  const symbol = symbols[currencyCode] || currencyCode;
  const formattedValue = Math.abs(value).toFixed(2);
  
  return value < 0 ? `-${symbol}${formattedValue}` : `${symbol}${formattedValue}`;
};

export { currencyFormatter, formatCurrencyWithSymbol };
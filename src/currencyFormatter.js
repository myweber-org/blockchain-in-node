const currencyFormatter = (amount, locale = 'en-US', currency = 'USD') => {
  if (typeof amount !== 'number') {
    throw new TypeError('Amount must be a number');
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(amount);
};

const formatCurrencyList = (amounts, locale = 'en-US', currency = 'USD') => {
  return amounts.map(amount => currencyFormatter(amount, locale, currency));
};

export { currencyFormatter, formatCurrencyList };function formatCurrency(value, locale = 'en-US', currency = 'USD') {
  if (typeof value !== 'number') {
    throw new TypeError('Value must be a number');
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function parseCurrency(formattedString, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  
  const cleanString = formattedString
    .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
    .replace(new RegExp(`\\${decimalSeparator}`), '.')
    .replace(/[^\d.-]/g, '');
  
  const parsedValue = parseFloat(cleanString);
  return isNaN(parsedValue) ? null : parsedValue;
}

export { formatCurrency, parseCurrency };
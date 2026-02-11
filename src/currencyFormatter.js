function formatCurrency(value, locale = 'en-US', options = {}) {
  const defaultOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };

  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError('Value must be a valid number');
  }

  try {
    return new Intl.NumberFormat(locale, defaultOptions).format(value);
  } catch (error) {
    console.error('Currency formatting failed:', error);
    return value.toString();
  }
}

function parseCurrency(formattedString, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  
  const cleanString = formattedString
    .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
    .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
    .replace(/[^\d.-]/g, '');
  
  const parsedValue = parseFloat(cleanString);
  return isNaN(parsedValue) ? null : parsedValue;
}

export { formatCurrency, parseCurrency };
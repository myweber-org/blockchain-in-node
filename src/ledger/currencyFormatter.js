function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
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
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    const cleaned = formattedString
        .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
        .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
        .replace(/[^\d.-]/g, '');
    
    return parseFloat(cleaned);
}

export { formatCurrency, parseCurrency };function formatCurrency(value, locale = 'en-US', currency = 'USD') {
    if (typeof value !== 'number') {
        throw new TypeError('Value must be a number');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(value);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    const cleanString = formattedString
        .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
        .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
        .replace(/[^\d.-]/g, '');
    
    const parsedValue = parseFloat(cleanString);
    return isNaN(parsedValue) ? null : parsedValue;
}

export { formatCurrency, parseCurrency };function formatCurrency(value, currencySymbol = '$', decimalPlaces = 2) {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Invalid input: value must be a valid number');
    }
    
    const fixedValue = value.toFixed(decimalPlaces);
    const parts = fixedValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return currencySymbol + parts.join('.');
}

function parseFormattedCurrency(formattedString, currencySymbol = '$') {
    const cleaned = formattedString.replace(new RegExp('[' + currencySymbol + ',]', 'g'), '');
    const parsed = parseFloat(cleaned);
    
    if (isNaN(parsed)) {
        throw new Error('Invalid input: string cannot be parsed to number');
    }
    
    return parsed;
}

export { formatCurrency, parseFormattedCurrency };function formatCurrency(value, locale = 'en-US', options = {}) {
  const defaultOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };
  
  try {
    const formatter = new Intl.NumberFormat(locale, defaultOptions);
    return formatter.format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return value.toString();
  }
}

function parseCurrency(formattedValue, locale = 'en-US') {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
  
  const cleanValue = formattedValue
    .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
    .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
    .replace(/[^\d.-]/g, '');
    
  return parseFloat(cleanValue) || 0;
}

export { formatCurrency, parseCurrency };
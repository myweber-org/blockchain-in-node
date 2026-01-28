function formatCurrency(value, locale = 'en-US', currency = 'USD') {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new TypeError('Value must be a valid number');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(value);
}

function parseCurrency(formattedValue, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1111.11);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    const cleanValue = formattedValue
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
        .replace(/[^\d.-]/g, '');
    
    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? null : parsed;
}

export { formatCurrency, parseCurrency };function formatCurrency(value, locale = 'en-US', options = {}) {
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
  
  const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
  const numericString = formattedValue
    .replace(regex, '')
    .replace(decimalSeparator, '.');
  
  return parseFloat(numericString) || 0;
}

export { formatCurrency, parseCurrency };function formatCurrency(value, locale = 'en-US', options = {}) {
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
  const example = formatCurrency(1234.56, locale);
  const groupSeparator = example.replace(/[\d.,]/g, '').charAt(0);
  const decimalSeparator = example.replace(/[\d.,]/g, '').charAt(1) || '.';
  
  const cleanValue = formattedValue
    .replace(new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g'), match => 
      match === decimalSeparator ? '.' : ''
    )
    .replace(/[^\d.-]/g, '');
  
  return parseFloat(cleanValue);
}

export { formatCurrency, parseCurrency };
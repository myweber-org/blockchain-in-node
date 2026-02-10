const currencyFormatter = (amount, locale = 'en-US', currency = 'USD') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount provided');
  }
  
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(amount);
};

const formatCurrencyWithSymbol = (amount, currencySymbol = '$', decimalPlaces = 2) => {
  const fixedAmount = amount.toFixed(decimalPlaces);
  const parts = fixedAmount.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${currencySymbol}${parts.join('.')}`;
};

export { currencyFormatter, formatCurrencyWithSymbol };function formatCurrency(value, locale = 'en-US', currency = 'USD') {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Invalid input: value must be a valid number');
    }
    
    const options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    
    return new Intl.NumberFormat(locale, options).format(value);
}

function parseCurrency(formattedValue, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    const cleanedValue = formattedValue
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
        .replace(/[^\d.-]/g, '');
    
    const parsedValue = parseFloat(cleanedValue);
    
    if (isNaN(parsedValue)) {
        throw new Error('Invalid currency format');
    }
    
    return parsedValue;
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new Error('Amount must be a valid number');
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
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    
    const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
    const numericString = formattedString.replace(regex, '').replace(decimalSeparator, '.');
    
    return parseFloat(numericString);
}

export { formatCurrency, parseCurrency };
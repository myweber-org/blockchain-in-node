function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
    const normalized = formattedString.replace(regex, match => 
        match === groupSeparator ? '' : '.'
    );
    
    return parseFloat(normalized.replace(/[^\d.-]/g, ''));
}

export { formatCurrency, parseCurrency };function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
  const example = formatCurrency(0, locale);
  const cleanPattern = example.replace(/0/g, '\\d').replace(/[^\d]/g, '[^\\d]*');
  const regex = new RegExp(cleanPattern.replace(/\\d/g, '(\\d+)'));
  const matches = formattedString.match(regex);
  
  if (matches) {
    return parseFloat(matches[1]) / 100;
  }
  return null;
}

export { formatCurrency, parseCurrency };
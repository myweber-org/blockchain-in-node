function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
    const normalized = formattedString.replace(regex, match => 
        match === groupSeparator ? '' : '.'
    );
    
    return parseFloat(normalized.replace(/[^\d.-]/g, ''));
}

export { formatCurrency, parseCurrency };
function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new TypeError('Amount must be a valid number');
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

  const cleanString = formattedString
    .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
    .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.');

  const number = parseFloat(cleanString.replace(/[^\d.-]/g, ''));

  return isNaN(number) ? null : number;
}

export { formatCurrency, parseCurrency };
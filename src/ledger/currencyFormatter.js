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
    const parts = new Intl.NumberFormat(locale).formatToParts(1111.11);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    const cleaned = formattedString
        .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
        .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
        .replace(/[^\d.-]/g, '');
    
    return parseFloat(cleaned);
}

export { formatCurrency, parseCurrency };function formatCurrency(value, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(value);
}

function parseCurrency(formattedValue, locale = 'en-US') {
    const example = formatCurrency(0, locale);
    const cleanPattern = example.replace(/0/g, '\\d').replace(/[^\d]/g, '[^\\d]*');
    const regex = new RegExp(cleanPattern);
    const match = formattedValue.match(regex);
    
    if (!match) return null;
    
    const digits = formattedValue.replace(/[^\d]/g, '');
    return parseInt(digits, 10) / 100;
}

export { formatCurrency, parseCurrency };
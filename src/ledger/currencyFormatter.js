function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
  const example = formatCurrency(0, locale);
  const cleanPattern = example.replace(/0/g, '\\d').replace(/[^\d]/g, '[^\\d]*');
  const regex = new RegExp(cleanPattern);
  const match = formattedString.match(regex);
  
  if (!match) return null;
  
  const digits = formattedString.replace(/\D/g, '');
  const divisor = Math.pow(10, new Intl.NumberFormat(locale).resolvedOptions().minimumFractionDigits || 2);
  return parseInt(digits) / divisor;
}

export { formatCurrency, parseCurrency };
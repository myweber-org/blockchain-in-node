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

const formatCurrencyWithSymbol = (amount, currencySymbol = '$', decimalSeparator = '.') => {
  const fixedAmount = amount.toFixed(2);
  const parts = fixedAmount.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1] || '00';
  
  return `${currencySymbol}${integerPart}${decimalSeparator}${decimalPart}`;
};

export { currencyFormatter, formatCurrencyWithSymbol };
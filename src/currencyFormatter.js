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

export { currencyFormatter, formatCurrencyList };
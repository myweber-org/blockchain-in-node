const exchangeRates = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35,
    CNY: 6.45
};

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        throw new Error('Invalid currency code');
    }
    
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];
    
    return parseFloat(convertedAmount.toFixed(2));
}

function getAvailableCurrencies() {
    return Object.keys(exchangeRates);
}

function updateExchangeRate(currency, rate) {
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Invalid exchange rate');
    }
    exchangeRates[currency] = rate;
}

module.exports = {
    convertCurrency,
    getAvailableCurrencies,
    updateExchangeRate
};const exchangeRates = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  CAD: 1.25
};

const cache = new Map();

function convertCurrency(amount, fromCurrency, toCurrency) {
  const cacheKey = `${fromCurrency}_${toCurrency}`;
  
  if (!cache.has(cacheKey)) {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      throw new Error('Unsupported currency');
    }
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    cache.set(cacheKey, rate);
  }
  
  const rate = cache.get(cacheKey);
  return amount * rate;
}

function formatCurrency(amount, currency) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  });
  return formatter.format(amount);
}

export { convertCurrency, formatCurrency };
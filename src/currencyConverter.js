const axios = require('axios');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
  }

  async convert(amount, fromCurrency, toCurrency) {
    try {
      const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
      const rates = response.data.rates;
      
      if (!rates[toCurrency]) {
        throw new Error(`Invalid target currency: ${toCurrency}`);
      }

      const exchangeRate = rates[toCurrency];
      const convertedAmount = amount * exchangeRate;

      return {
        originalAmount: amount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: exchangeRate,
        convertedAmount: parseFloat(convertedAmount.toFixed(2))
      };
    } catch (error) {
      console.error('Conversion error:', error.message);
      throw new Error(`Failed to convert currency: ${error.message}`);
    }
  }

  async getAvailableCurrencies() {
    try {
      const response = await axios.get(`${this.baseUrl}/USD`);
      return Object.keys(response.data.rates);
    } catch (error) {
      console.error('Failed to fetch currencies:', error.message);
      return [];
    }
  }

  async getExchangeRate(fromCurrency, toCurrency) {
    try {
      const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
      const rates = response.data.rates;
      
      if (!rates[toCurrency]) {
        throw new Error(`Invalid target currency: ${toCurrency}`);
      }

      return rates[toCurrency];
    } catch (error) {
      console.error('Failed to get exchange rate:', error.message);
      throw error;
    }
  }
}

module.exports = CurrencyConverter;const exchangeRates = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  CAD: 1.25
};

class CurrencyConverter {
  constructor(rates = exchangeRates) {
    this.rates = rates;
    this.cache = new Map();
  }

  convert(amount, fromCurrency, toCurrency) {
    if (!this.rates[fromCurrency] || !this.rates[toCurrency]) {
      throw new Error('Unsupported currency');
    }

    const cacheKey = `${amount}_${fromCurrency}_${toCurrency}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const baseAmount = amount / this.rates[fromCurrency];
    const convertedAmount = baseAmount * this.rates[toCurrency];
    const result = parseFloat(convertedAmount.toFixed(2));

    this.cache.set(cacheKey, result);
    return result;
  }

  updateRate(currency, rate) {
    if (rate <= 0) {
      throw new Error('Rate must be positive');
    }
    this.rates[currency] = rate;
    this.cache.clear();
  }

  getSupportedCurrencies() {
    return Object.keys(this.rates);
  }
}

export default CurrencyConverter;
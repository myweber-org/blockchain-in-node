const axios = require('axios');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
    this.cache = new Map();
    this.cacheDuration = 300000; // 5 minutes
  }

  async convert(amount, fromCurrency, toCurrency) {
    try {
      const rate = await this.getExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = amount * rate;
      return {
        originalAmount: amount,
        fromCurrency: fromCurrency.toUpperCase(),
        toCurrency: toCurrency.toUpperCase(),
        exchangeRate: rate,
        convertedAmount: parseFloat(convertedAmount.toFixed(2))
      };
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
  }

  async getExchangeRate(fromCurrency, toCurrency) {
    const cacheKey = `${fromCurrency}_${toCurrency}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.rate;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
      const rates = response.data.rates;
      const rate = rates[toCurrency.toUpperCase()];
      
      if (!rate) {
        throw new Error(`Invalid currency code: ${toCurrency}`);
      }

      this.cache.set(cacheKey, {
        rate: rate,
        timestamp: Date.now()
      });

      return rate;
    } catch (error) {
      throw new Error(`Failed to fetch exchange rates: ${error.message}`);
    }
  }

  clearCache() {
    this.cache.clear();
  }

  getCacheSize() {
    return this.cache.size;
  }
}

module.exports = CurrencyConverter;function fetchExchangeRate(baseCurrency, targetCurrency) {
    const apiKey = 'YOUR_API_KEY_HERE';
    const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.rates || !data.rates[targetCurrency]) {
                throw new Error(`Exchange rate for ${targetCurrency} not found`);
            }
            return data.rates[targetCurrency];
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            return null;
        });
}

function convertCurrency(amount, baseCurrency, targetCurrency) {
    return fetchExchangeRate(baseCurrency, targetCurrency)
        .then(rate => {
            if (rate === null) {
                return null;
            }
            const convertedAmount = amount * rate;
            return {
                amount: amount,
                baseCurrency: baseCurrency,
                targetCurrency: targetCurrency,
                rate: rate,
                convertedAmount: convertedAmount,
                timestamp: new Date().toISOString()
            };
        });
}

function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function displayConversionResult(result) {
    if (!result) {
        console.log('Conversion failed. Please check your inputs and try again.');
        return;
    }
    
    console.log(`Conversion Result:`);
    console.log(`${formatCurrency(result.amount, result.baseCurrency)} = ${formatCurrency(result.convertedAmount, result.targetCurrency)}`);
    console.log(`Exchange Rate: 1 ${result.baseCurrency} = ${result.rate.toFixed(4)} ${result.targetCurrency}`);
    console.log(`Last updated: ${new Date(result.timestamp).toLocaleString()}`);
}

// Example usage
convertCurrency(100, 'USD', 'EUR')
    .then(result => displayConversionResult(result));const axios = require('axios');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
    this.cache = new Map();
    this.cacheDuration = 300000; // 5 minutes
  }

  async convert(amount, fromCurrency, toCurrency) {
    try {
      const rate = await this.getExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = amount * rate;
      return {
        originalAmount: amount,
        fromCurrency: fromCurrency.toUpperCase(),
        toCurrency: toCurrency.toUpperCase(),
        exchangeRate: rate,
        convertedAmount: parseFloat(convertedAmount.toFixed(2))
      };
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
  }

  async getExchangeRate(fromCurrency, toCurrency) {
    const cacheKey = `${fromCurrency}_${toCurrency}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.rate;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
      const rates = response.data.rates;
      const rate = rates[toCurrency.toUpperCase()];
      
      if (!rate) {
        throw new Error(`Invalid currency code: ${toCurrency}`);
      }

      this.cache.set(cacheKey, {
        rate: rate,
        timestamp: Date.now()
      });

      return rate;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error(`Invalid currency code: ${fromCurrency}`);
      }
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.entries()).map(([key, value]) => ({
        pair: key,
        rate: value.rate,
        age: Date.now() - value.timestamp
      }))
    };
  }
}

module.exports = CurrencyConverter;const exchangeRates = {
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
    updateExchangeRate,
    exchangeRates
};
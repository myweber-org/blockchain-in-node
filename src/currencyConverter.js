const axios = require('axios');

class CurrencyConverter {
    constructor() {
        this.exchangeRates = {};
        this.baseCurrency = 'USD';
        this.cacheDuration = 3600000; // 1 hour in milliseconds
        this.lastFetchTime = 0;
    }

    async fetchExchangeRates() {
        const currentTime = Date.now();
        
        if (currentTime - this.lastFetchTime < this.cacheDuration && Object.keys(this.exchangeRates).length > 0) {
            return this.exchangeRates;
        }

        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`);
            this.exchangeRates = response.data.rates;
            this.lastFetchTime = currentTime;
            return this.exchangeRates;
        } catch (error) {
            console.error('Failed to fetch exchange rates:', error.message);
            throw new Error('Unable to retrieve exchange rates');
        }
    }

    async convert(amount, fromCurrency, toCurrency) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }

        await this.fetchExchangeRates();

        if (!this.exchangeRates[fromCurrency] || !this.exchangeRates[toCurrency]) {
            throw new Error('Invalid currency code provided');
        }

        if (fromCurrency === this.baseCurrency) {
            return amount * this.exchangeRates[toCurrency];
        }

        if (toCurrency === this.baseCurrency) {
            return amount / this.exchangeRates[fromCurrency];
        }

        const amountInBase = amount / this.exchangeRates[fromCurrency];
        return amountInBase * this.exchangeRates[toCurrency];
    }

    getSupportedCurrencies() {
        return Object.keys(this.exchangeRates).sort();
    }

    setBaseCurrency(currency) {
        if (!this.exchangeRates[currency] && currency !== this.baseCurrency) {
            throw new Error('Unsupported base currency');
        }
        this.baseCurrency = currency;
        this.exchangeRates = {};
        this.lastFetchTime = 0;
    }

    isCacheValid() {
        return Date.now() - this.lastFetchTime < this.cacheDuration;
    }
}

module.exports = CurrencyConverter;const axios = require('axios');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
    this.cache = new Map();
    this.cacheDuration = 300000; // 5 minutes
  }

  async convert(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    const rates = await this.getExchangeRates(fromCurrency);
    const rate = rates[toCurrency];

    if (!rate) {
      throw new Error(`Exchange rate not available for ${toCurrency}`);
    }

    return amount * rate;
  }

  async getExchangeRates(baseCurrency) {
    const cacheKey = baseCurrency;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.rates;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/${baseCurrency}`);
      const rates = response.data.rates;
      
      this.cache.set(cacheKey, {
        rates: rates,
        timestamp: Date.now()
      });

      return rates;
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

module.exports = CurrencyConverter;const fetch = require('node-fetch');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
  }

  async convert(amount, fromCurrency, toCurrency) {
    try {
      const response = await fetch(`${this.baseUrl}/${fromCurrency}`);
      const data = await response.json();
      
      if (!data.rates || !data.rates[toCurrency]) {
        throw new Error('Invalid currency code');
      }
      
      const rate = data.rates[toCurrency];
      const convertedAmount = amount * rate;
      
      return {
        original: amount,
        from: fromCurrency,
        to: toCurrency,
        rate: rate,
        converted: convertedAmount,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
  }

  async getAvailableCurrencies() {
    try {
      const response = await fetch(`${this.baseUrl}/USD`);
      const data = await response.json();
      return Object.keys(data.rates);
    } catch (error) {
      throw new Error(`Failed to fetch currencies: ${error.message}`);
    }
  }

  formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    }).format(amount);
  }
}

module.exports = CurrencyConverter;const axios = require('axios');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
    this.cache = new Map();
    this.cacheDuration = 3600000; // 1 hour in milliseconds
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
    const cachedData = this.cache.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < this.cacheDuration) {
      return cachedData.rate;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
      const rates = response.data.rates;
      
      if (!rates[toCurrency]) {
        throw new Error(`Invalid currency code: ${toCurrency}`);
      }

      const rate = rates[toCurrency];
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

module.exports = CurrencyConverter;const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    const cachedRate = exchangeRates[cacheKey];
    
    if (cachedRate && Date.now() - cachedRate.timestamp < 3600000) {
        return cachedRate.rate;
    }
    
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
        const data = await response.json();
        const rate = data.rates[target];
        
        exchangeRates[cacheKey] = {
            rate: rate,
            timestamp: Date.now()
        };
        
        return rate;
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw new Error('Exchange rate service unavailable');
    }
}

function convertCurrency(amount, baseCurrency, targetCurrency) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Amount must be a positive number');
    }
    
    if (!baseCurrency || !targetCurrency) {
        throw new Error('Both base and target currencies are required');
    }
    
    return fetchExchangeRate(baseCurrency, targetCurrency)
        .then(rate => {
            const convertedAmount = amount * rate;
            return {
                originalAmount: amount,
                baseCurrency: baseCurrency,
                targetCurrency: targetCurrency,
                exchangeRate: rate,
                convertedAmount: parseFloat(convertedAmount.toFixed(2))
            };
        });
}

function getSupportedCurrencies() {
    return ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'];
}

export { convertCurrency, getSupportedCurrencies };const exchangeRates = {
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

function formatCurrency(amount, currencyCode) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    });
    return formatter.format(amount);
}

function getAvailableCurrencies() {
    return Object.keys(exchangeRates).sort();
}

function updateExchangeRate(currency, newRate) {
    if (typeof newRate !== 'number' || newRate <= 0) {
        throw new Error('Exchange rate must be a positive number');
    }
    exchangeRates[currency] = newRate;
    return true;
}

export { convertCurrency, formatCurrency, getAvailableCurrencies, updateExchangeRate };function fetchExchangeRate(baseCurrency, targetCurrency) {
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
        console.log('Conversion failed');
        return;
    }
    
    console.log(`${formatCurrency(result.amount, result.baseCurrency)} = ${formatCurrency(result.convertedAmount, result.targetCurrency)}`);
    console.log(`Exchange rate: 1 ${result.baseCurrency} = ${result.rate.toFixed(4)} ${result.targetCurrency}`);
    console.log(`Conversion time: ${result.timestamp}`);
}

export { convertCurrency, formatCurrency, displayConversionResult };const exchangeRates = {
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

function getSupportedCurrencies() {
    return Object.keys(exchangeRates);
}

function updateExchangeRate(currency, rate) {
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Invalid exchange rate');
    }
    
    exchangeRates[currency] = rate;
    return true;
}

module.exports = {
    convertCurrency,
    getSupportedCurrencies,
    updateExchangeRate
};const axios = require('axios');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
  }

  async convert(amount, fromCurrency, toCurrency) {
    try {
      const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      
      if (!rate) {
        throw new Error(`Conversion rate for ${toCurrency} not found`);
      }
      
      const convertedAmount = amount * rate;
      return {
        original: amount,
        converted: convertedAmount,
        from: fromCurrency,
        to: toCurrency,
        rate: rate,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
  }

  async getAvailableCurrencies() {
    try {
      const response = await axios.get(`${this.baseUrl}/USD`);
      return Object.keys(response.data.rates);
    } catch (error) {
      throw new Error(`Failed to fetch currencies: ${error.message}`);
    }
  }

  formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    }).format(amount);
  }
}

module.exports = CurrencyConverter;const axios = require('axios');

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

module.exports = CurrencyConverter;
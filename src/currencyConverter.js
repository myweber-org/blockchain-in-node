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

module.exports = CurrencyConverter;
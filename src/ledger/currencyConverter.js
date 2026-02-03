const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.cache = new Map();
        this.cacheDuration = 3600000; // 1 hour
    }

    async convert(amount, fromCurrency, toCurrency) {
        try {
            const rate = await this.getExchangeRate(fromCurrency, toCurrency);
            const convertedAmount = amount * rate;
            return {
                amount: amount,
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

    async getExchangeRate(fromCurrency, toCurrency) {
        const cacheKey = `${fromCurrency}_${toCurrency}`;
        const cached = this.cache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            return cached.rate;
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

    async getAvailableCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            throw new Error(`Failed to fetch available currencies: ${error.message}`);
        }
    }

    clearCache() {
        this.cache.clear();
    }
}

module.exports = CurrencyConverter;const fetchExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    if (!response.ok) throw new Error('Failed to fetch exchange rates');
    const data = await response.json();
    return data.rates[toCurrency];
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
};

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  const rate = await fetchExchangeRate(fromCurrency, toCurrency);
  if (rate === null) return null;
  return amount * rate;
};

const formatCurrency = (amount, currencyCode) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
};

export { convertCurrency, formatCurrency };
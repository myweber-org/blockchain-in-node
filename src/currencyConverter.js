const axios = require('axios');

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
        throw new Error(`Exchange rate for ${toCurrency} not found`);
      }
      
      const convertedAmount = amount * rate;
      return {
        originalAmount: amount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: rate,
        convertedAmount: parseFloat(convertedAmount.toFixed(2))
      };
    } catch (error) {
      console.error('Conversion error:', error.message);
      throw error;
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
      return response.data.rates[toCurrency];
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error.message);
      return null;
    }
  }
}

module.exports = CurrencyConverter;const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    const cached = exchangeRates[cacheKey];
    
    if (cached && Date.now() - cached.timestamp < 3600000) {
        return cached.rate;
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
        return null;
    }
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    return fetchExchangeRate(fromCurrency, toCurrency)
        .then(rate => {
            if (rate === null) {
                throw new Error('Conversion rate unavailable');
            }
            return amount * rate;
        });
}

function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    }).format(amount);
}

export { convertCurrency, formatCurrency };
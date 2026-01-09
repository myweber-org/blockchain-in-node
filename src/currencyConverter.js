function fetchExchangeRate(baseCurrency, targetCurrency) {
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
            console.error('Failed to fetch exchange rate:', error);
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

const CurrencyConverter = {
    convert: convertCurrency,
    format: formatCurrency,
    
    async convertAndDisplay(amount, from, to, elementId) {
        const result = await this.convert(amount, from, to);
        if (result && elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `
                    ${this.format(amount, from)} = 
                    ${this.format(result.convertedAmount, to)}
                    <br><small>Rate: 1 ${from} = ${result.rate.toFixed(4)} ${to}</small>
                `;
            }
        }
        return result;
    }
};

export default CurrencyConverter;const axios = require('axios');

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

        if (cached && (Date.now() - cached.timestamp) < this.cacheDuration) {
            return cached.rate;
        }

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
    }

    async getAvailableCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            throw new Error(`Failed to fetch currencies: ${error.message}`);
        }
    }

    clearCache() {
        this.cache.clear();
        return 'Cache cleared successfully';
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
};const fetchExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    return data.rates[toCurrency];
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
};

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  const rate = await fetchExchangeRate(fromCurrency, toCurrency);
  if (rate === null) {
    return 'Conversion failed';
  }
  const convertedAmount = amount * rate;
  return `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
};

const CurrencyConverter = {
  convert: convertCurrency,
  getRate: fetchExchangeRate
};

export default CurrencyConverter;const exchangeRates = {
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

function updateExchangeRate(currency, newRate) {
    if (!exchangeRates[currency]) {
        throw new Error('Currency not found');
    }
    if (typeof newRate !== 'number' || newRate <= 0) {
        throw new Error('Invalid exchange rate');
    }
    exchangeRates[currency] = newRate;
}

module.exports = {
    convertCurrency,
    getAvailableCurrencies,
    updateExchangeRate,
    exchangeRates
};const exchangeRates = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35
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
};const axios = require('axios');

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

  getSupportedCurrencies() {
    return [
      'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL',
      'RUB', 'KRW', 'MXN', 'SGD', 'HKD', 'NZD', 'SEK', 'NOK', 'DKK', 'ZAR'
    ];
  }
}

module.exports = CurrencyConverter;
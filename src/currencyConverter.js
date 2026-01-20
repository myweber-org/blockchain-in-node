const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.cache = new Map();
        this.cacheDuration = 300000; // 5 minutes
    }

    async convert(amount, fromCurrency, toCurrency) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }

        const rate = await this.getExchangeRate(fromCurrency, toCurrency);
        return amount * rate;
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
            if (error.response && error.response.status === 404) {
                throw new Error(`Invalid currency code: ${fromCurrency}`);
            }
            throw new Error(`Failed to fetch exchange rates: ${error.message}`);
        }
    }

    async getSupportedCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            throw new Error(`Failed to fetch supported currencies: ${error.message}`);
        }
    }

    clearCache() {
        this.cache.clear();
    }

    setCacheDuration(duration) {
        if (typeof duration !== 'number' || duration <= 0) {
            throw new Error('Cache duration must be a positive number');
        }
        this.cacheDuration = duration;
    }
}

module.exports = CurrencyConverter;const exchangeRates = {};

async function fetchExchangeRate(baseCurrency, targetCurrency) {
    const cacheKey = `${baseCurrency}_${targetCurrency}`;
    const cacheDuration = 10 * 60 * 1000;

    if (exchangeRates[cacheKey] && Date.now() - exchangeRates[cacheKey].timestamp < cacheDuration) {
        return exchangeRates[cacheKey].rate;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        const rate = data.rates[targetCurrency];
        
        if (rate) {
            exchangeRates[cacheKey] = {
                rate: rate,
                timestamp: Date.now()
            };
            return rate;
        }
    } catch (error) {
        console.warn('Failed to fetch exchange rate:', error);
    }

    return null;
}

function convertCurrency(amount, baseCurrency, targetCurrency) {
    return fetchExchangeRate(baseCurrency, targetCurrency)
        .then(rate => {
            if (rate === null) {
                throw new Error(`Unable to get exchange rate for ${baseCurrency} to ${targetCurrency}`);
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
const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.cache = {};
        this.cacheDuration = 3600000; // 1 hour
    }

    async convert(amount, fromCurrency, toCurrency) {
        try {
            const rate = await this.getExchangeRate(fromCurrency, toCurrency);
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

    async getExchangeRate(fromCurrency, toCurrency) {
        const cacheKey = `${fromCurrency}_${toCurrency}`;
        const cached = this.cache[cacheKey];

        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            return cached.rate;
        }

        const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
        const rates = response.data.rates;
        
        if (!rates[toCurrency]) {
            throw new Error(`Invalid currency code: ${toCurrency}`);
        }

        const rate = rates[toCurrency];
        
        this.cache[cacheKey] = {
            rate: rate,
            timestamp: Date.now()
        };

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
        this.cache = {};
    }
}

module.exports = CurrencyConverter;
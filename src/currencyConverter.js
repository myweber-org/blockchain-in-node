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

module.exports = CurrencyConverter;
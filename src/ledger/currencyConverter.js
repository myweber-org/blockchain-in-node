const fetchExchangeRate = async (fromCurrency, toCurrency) => {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        return data.rates[toCurrency];
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        return null;
    }
};

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    const rate = await fetchExchangeRate(fromCurrency, toCurrency);
    if (rate === null) {
        return null;
    }
    const convertedAmount = amount * rate;
    return {
        originalAmount: amount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: rate,
        convertedAmount: convertedAmount
    };
};

const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    }).format(amount);
};

const displayConversion = async () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    
    const result = await convertCurrency(amount, fromCurrency, toCurrency);
    
    if (result) {
        console.log(`${formatCurrency(result.originalAmount, result.fromCurrency)} equals ${formatCurrency(result.convertedAmount, result.toCurrency)}`);
        console.log(`Exchange rate: 1 ${result.fromCurrency} = ${result.exchangeRate} ${result.toCurrency}`);
    } else {
        console.log('Currency conversion failed');
    }
};

export { fetchExchangeRate, convertCurrency, formatCurrency, displayConversion };const axios = require('axios');

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
            
            const rate = rates[toCurrency];
            const convertedAmount = amount * rate;
            
            return {
                originalAmount: amount,
                fromCurrency: fromCurrency,
                toCurrency: toCurrency,
                conversionRate: rate,
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
}

module.exports = CurrencyConverter;const exchangeRates = {};

async function fetchExchangeRate(baseCurrency, targetCurrency) {
    const cacheKey = `${baseCurrency}_${targetCurrency}`;
    const cacheDuration = 30 * 60 * 1000; // 30 minutes
    
    if (exchangeRates[cacheKey] && 
        Date.now() - exchangeRates[cacheKey].timestamp < cacheDuration) {
        return exchangeRates[cacheKey].rate;
    }
    
    try {
        const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        );
        const data = await response.json();
        const rate = data.rates[targetCurrency];
        
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
    return fetchExchangeRate(baseCurrency, targetCurrency)
        .then(rate => {
            if (!rate) {
                throw new Error(`Exchange rate not available for ${targetCurrency}`);
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
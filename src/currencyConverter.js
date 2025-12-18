const axios = require('axios');

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
            throw new Error('Failed to fetch exchange rates');
        }
    }

    async getAvailableCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            console.error('Error fetching currencies:', error.message);
            return [];
        }
    }

    formatCurrency(amount, currencyCode) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode
        }).format(amount);
    }
}

module.exports = CurrencyConverter;
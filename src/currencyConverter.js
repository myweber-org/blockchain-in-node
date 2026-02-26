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
        convertedAmount: parseFloat(convertedAmount.toFixed(2)),
        toCurrency: toCurrency,
        exchangeRate: rate,
        timestamp: new Date().toISOString()
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
      return response.data.rates[toCurrency];
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error.message);
      return null;
    }
  }
}

module.exports = CurrencyConverter;function fetchExchangeRate(baseCurrency, targetCurrency) {
    const apiKey = 'YOUR_API_KEY_HERE';
    const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.rates && data.rates[targetCurrency]) {
                return data.rates[targetCurrency];
            } else {
                throw new Error('Target currency not found in exchange rates');
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            throw error;
        });
}

function convertCurrency(amount, baseCurrency, targetCurrency) {
    return fetchExchangeRate(baseCurrency, targetCurrency)
        .then(rate => {
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

function updateConversionResult(result) {
    const output = document.getElementById('conversionResult');
    if (output) {
        output.innerHTML = `
            <p>${formatCurrency(result.amount, result.baseCurrency)} = 
               ${formatCurrency(result.convertedAmount, result.targetCurrency)}</p>
            <p>Exchange rate: 1 ${result.baseCurrency} = ${result.rate.toFixed(4)} ${result.targetCurrency}</p>
            <p>Last updated: ${new Date(result.timestamp).toLocaleString()}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convertButton');
    if (convertButton) {
        convertButton.addEventListener('click', function() {
            const amount = parseFloat(document.getElementById('amount').value);
            const baseCurrency = document.getElementById('baseCurrency').value;
            const targetCurrency = document.getElementById('targetCurrency').value;
            
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            
            convertCurrency(amount, baseCurrency, targetCurrency)
                .then(updateConversionResult)
                .catch(error => {
                    console.error('Conversion failed:', error);
                    alert('Currency conversion failed. Please try again.');
                });
        });
    }
});const exchangeRates = {
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

function formatCurrency(amount, currencyCode) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    });
    
    return formatter.format(amount);
}

function updateExchangeRate(currency, rate) {
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Rate must be a positive number');
    }
    
    exchangeRates[currency] = rate;
    return true;
}

export { convertCurrency, formatCurrency, updateExchangeRate };
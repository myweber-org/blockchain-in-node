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

function updateConversionDisplay(result) {
    const displayElement = document.getElementById('conversionResult');
    if (displayElement) {
        displayElement.innerHTML = `
            <div class="conversion-result">
                <p>${formatCurrency(result.amount, result.baseCurrency)} =</p>
                <p class="converted-amount">${formatCurrency(result.convertedAmount, result.targetCurrency)}</p>
                <p class="exchange-rate">1 ${result.baseCurrency} = ${result.rate.toFixed(4)} ${result.targetCurrency}</p>
                <p class="timestamp">Last updated: ${new Date(result.timestamp).toLocaleString()}</p>
            </div>
        `;
    }
}

function initializeConverter() {
    const convertButton = document.getElementById('convertButton');
    const amountInput = document.getElementById('amountInput');
    const baseCurrencySelect = document.getElementById('baseCurrency');
    const targetCurrencySelect = document.getElementById('targetCurrency');
    
    if (convertButton && amountInput && baseCurrencySelect && targetCurrencySelect) {
        convertButton.addEventListener('click', () => {
            const amount = parseFloat(amountInput.value);
            const baseCurrency = baseCurrencySelect.value;
            const targetCurrency = targetCurrencySelect.value;
            
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid positive amount');
                return;
            }
            
            convertButton.disabled = true;
            convertButton.textContent = 'Converting...';
            
            convertCurrency(amount, baseCurrency, targetCurrency)
                .then(result => {
                    updateConversionDisplay(result);
                })
                .catch(error => {
                    console.error('Conversion failed:', error);
                    alert('Failed to convert currency. Please try again.');
                })
                .finally(() => {
                    convertButton.disabled = false;
                    convertButton.textContent = 'Convert';
                });
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeConverter);const exchangeRates = {};

async function fetchExchangeRate(base, target) {
  const cacheKey = `${base}_${target}`;
  const cached = exchangeRates[cacheKey];
  
  if (cached && Date.now() - cached.timestamp < 300000) {
    return cached.rate;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    const data = await response.json();
    const rate = data.rates[target];
    
    if (!rate) {
      throw new Error(`Exchange rate for ${target} not found`);
    }

    exchangeRates[cacheKey] = {
      rate: rate,
      timestamp: Date.now()
    };

    return rate;
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    throw error;
  }
}

function validateAmount(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Amount must be a valid number');
  }
  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }
  return true;
}

function validateCurrencyCode(currency) {
  if (typeof currency !== 'string' || currency.length !== 3) {
    throw new Error('Currency code must be a 3-letter string');
  }
  return true;
}

async function convertCurrency(amount, fromCurrency, toCurrency) {
  validateAmount(amount);
  validateCurrencyCode(fromCurrency);
  validateCurrencyCode(toCurrency);

  const rate = await fetchExchangeRate(fromCurrency.toUpperCase(), toCurrency.toUpperCase());
  const convertedAmount = amount * rate;
  
  return {
    originalAmount: amount,
    originalCurrency: fromCurrency.toUpperCase(),
    convertedAmount: parseFloat(convertedAmount.toFixed(2)),
    targetCurrency: toCurrency.toUpperCase(),
    exchangeRate: rate,
    timestamp: new Date().toISOString()
  };
}

function formatCurrencyOutput(conversionResult) {
  return `${conversionResult.originalAmount} ${conversionResult.originalCurrency} = ${conversionResult.convertedAmount} ${conversionResult.targetCurrency}`;
}

export { convertCurrency, formatCurrencyOutput, fetchExchangeRate };const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.cache = new Map();
        this.cacheDuration = 3600000; // 1 hour
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
                throw new Error(`Currency ${toCurrency} not supported`);
            }

            const rate = rates[toCurrency];
            this.cache.set(cacheKey, {
                rate: rate,
                timestamp: Date.now()
            });

            return rate;
        } catch (error) {
            if (error.response) {
                throw new Error(`API error: ${error.response.status}`);
            }
            throw new Error(`Failed to fetch exchange rates: ${error.message}`);
        }
    }

    clearCache() {
        this.cache.clear();
    }

    getSupportedCurrencies() {
        return ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'];
    }
}

module.exports = CurrencyConverter;
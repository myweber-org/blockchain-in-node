const exchangeRates = {};

async function fetchExchangeRate(fromCurrency, toCurrency) {
    const cacheKey = `${fromCurrency}_${toCurrency}`;
    const cacheTime = 24 * 60 * 60 * 1000;

    if (exchangeRates[cacheKey] && (Date.now() - exchangeRates[cacheKey].timestamp) < cacheTime) {
        return exchangeRates[cacheKey].rate;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        
        if (rate) {
            exchangeRates[cacheKey] = {
                rate: rate,
                timestamp: Date.now()
            };
            return rate;
        } else {
            throw new Error('Invalid currency code');
        }
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw error;
    }
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    return fetchExchangeRate(fromCurrency, toCurrency)
        .then(rate => {
            const convertedAmount = amount * rate;
            return {
                amount: amount,
                fromCurrency: fromCurrency,
                convertedAmount: parseFloat(convertedAmount.toFixed(2)),
                toCurrency: toCurrency,
                rate: rate,
                timestamp: new Date().toISOString()
            };
        });
}

function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    }).format(amount);
}

export { convertCurrency, formatCurrency };
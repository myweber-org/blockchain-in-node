const exchangeRates = {};

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
        throw new Error('Exchange rate service unavailable');
    }
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Invalid amount');
    }
    
    if (!fromCurrency || !toCurrency) {
        throw new Error('Currency codes required');
    }
    
    return fetchExchangeRate(fromCurrency, toCurrency)
        .then(rate => {
            const converted = amount * rate;
            return {
                original: amount,
                converted: converted,
                from: fromCurrency,
                to: toCurrency,
                rate: rate,
                timestamp: new Date().toISOString()
            };
        });
}

function getCachedRates() {
    return Object.keys(exchangeRates).reduce((acc, key) => {
        acc[key] = {
            rate: exchangeRates[key].rate,
            age: Math.floor((Date.now() - exchangeRates[key].timestamp) / 60000)
        };
        return acc;
    }, {});
}

export { convertCurrency, getCachedRates };
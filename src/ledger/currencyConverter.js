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

export { fetchExchangeRate, convertCurrency, formatCurrency, displayConversion };
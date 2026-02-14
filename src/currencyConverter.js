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

document.addEventListener('DOMContentLoaded', initializeConverter);
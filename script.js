// Since this is a little showcase app, I'll store the api key like this.
// If it was a real app, I'd store in as an environmental variable.
const apiKey = "daa5e60c9e46427e403781dbf61b3495";
const currenciesUrl = "https://data.fixer.io/api/latest";
const supportedCurrencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CNY",
    "UAH",
    "CHF",
    "AUD",
    "CZK",
];



// Elements ->
const mainCurrency = document.getElementById('main-currency');
const mainCurrencyAmount = document.getElementById('main-currency-amount');

const targetCurrency = document.getElementById('target-currency');
const targetCurrencyAmount = document.getElementById('target-currency-amount');

const swapBtn = document.getElementById('swap-btn');

const selectedMain = document.getElementById('selected-main')
const selectedTarget = document.getElementById('selected-target')

const mainTargetRate = document.getElementById('main-target-rate');
// Elements <-


// Variables ->

var ratesToEUR = {};

// Variables <-


// Listeners ->

mainCurrencyAmount.addEventListener('input', () => updateRates());
targetCurrency.addEventListener('change', () => updateRates());
mainCurrency.addEventListener('change', () => updateRates());
swapBtn.addEventListener('click', () => swapCurrencies());

// Listeners <-


// Functions ->

const initSupportedCurrencies = () => {
    supportedCurrencies.forEach(e => {
        const option1 = document.createElement('option');
        option1.textContent = e;

        console.log(option1.textContent);

        if (option1.textContent === "EUR") {
            console.log(option1.textContent);
            option1.selected = true;
        }

        const option2 = document.createElement('option');
        option2.textContent = e;

        mainCurrency.appendChild(option1);
        targetCurrency.appendChild(option2);
    })

    updateRates();
}

const updateRates = () => {
    const targetAmount = convertCurrencies(mainCurrency.value, targetCurrency.value, mainCurrencyAmount.value);
    targetCurrencyAmount.value = targetAmount;

    selectedMain.textContent = mainCurrency.value;
    selectedTarget.textContent = targetCurrency.value;
    mainTargetRate.textContent = convertCurrencies(mainCurrency.value, targetCurrency.value, 1, 3)
}

const fetchRatesToEUR = (currenciesList) => {
    try {
        const xhttp = new XMLHttpRequest();
        const currenciesQwery = currenciesList.join(',');

        xhttp.onload = () => {
            const response = JSON.parse(xhttp.responseText);

            if (response['success']) {
                ratesToEUR = response['rates'];

                console.log(ratesToEUR);
            } else {
                throw response.responseText;
            }
        }

        xhttp.open('GET', `${currenciesUrl}?access_key=${apiKey}&symbols=${currenciesQwery}`, false);
        xhttp.send();

    } catch (e) {
        console.log(e);
    }
}

const swapCurrencies = () => {
    const temp = targetCurrency.value
    targetCurrency.value = mainCurrency.value
    mainCurrency.value = temp;

    if (mainCurrencyAmount.value > 0) {
        mainCurrencyAmount.value = targetCurrencyAmount.value;
    }

    updateRates();
}

const convertCurrencies = (main, target, amount, toFixed = 2) => {
    return (ratesToEUR[target] * amount / ratesToEUR[main]).toFixed(toFixed);
}

// Functions <-

// Initialization
fetchRatesToEUR(supportedCurrencies);
initSupportedCurrencies();
// Since this is a little showcase app, I'll store the api key like this.
// If it was a real app, I'd store in as an environmental variable.
const apiKey = "daa5e60c9e46427e403781dbf61b3495";

const btn = document.getElementById('btn');


function getRateTest(currencies) {
    // const xhttp = new XMLHttpRequest();
    // xhttp.onload = function () {
    //     console.log(this.responseText);
    // }

    // const currenciesQwery = currencies.join(',');

    // xhttp.open("GET", `https://data.fixer.io/api/latest?access_key=${apiKey}&symbols=${currenciesQwery}`, true);
    // xhttp.send();

    // Temproary mock response to avoid loosing requsets.
    console.log('{"success":true,"timestamp":1761313624,"base":"EUR","date":"2025-10-24","rates":{"EUR":1,"USD":1.162493}}');
}


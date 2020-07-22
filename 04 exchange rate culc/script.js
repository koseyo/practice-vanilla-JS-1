const currencyEl_one = document.getElementById('currency-1');
const moneyEl_one = document.getElementById('money-1');
const currencyEl_two = document.getElementById('currency-2');
const moneyEl_two = document.getElementById('money-2');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// exchange rate and update
function caclulate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];

            rateEl.innerText = `1 ${currency_one} =${rate} ${currency_two}`;

            moneyEl_two.value = (moneyEl_one.value * rate).toFixed(2);
        });
}


// event listener
currencyEl_one.addEventListener('change', caclulate);
moneyEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate);
moneyEl_two.addEventListener('input', caclulate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    caclulate();
});

caclulate();
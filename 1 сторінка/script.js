const carCards = document.querySelectorAll('.car-card');
const carPriceInput = document.getElementById('car-price');
const activeCarName = document.getElementById('active-car-name');
const downPaymentInput = document.getElementById('down-payment');
const loanTermSelect = document.getElementById('loan-term');

const resBody = document.getElementById('res-body');
const resMonthly = document.getElementById('res-monthly');
const resOverpay = document.getElementById('res-overpay');
const saveBtn = document.getElementById('save-btn');

let selectedPrice = 0;
let selectedName = "";

carCards.forEach(card => {
    card.querySelector('.select-btn').addEventListener('click', () => {
        carCards.forEach(c => c.classList.remove('active-card'));
        card.classList.add('active-card');

        selectedPrice = +card.dataset.price;
        selectedName = card.dataset.name;

        carPriceInput.value = selectedPrice;
        activeCarName.innerText = selectedName;

        calculateLeasing();
    });
});

downPaymentInput.addEventListener('input', calculateLeasing);
loanTermSelect.addEventListener('change', calculateLeasing);

function calculateLeasing() {
    if (selectedPrice === 0) return;

    const downPayment = +downPaymentInput.value;
    const term = +loanTermSelect.value;

    if (downPayment >= selectedPrice) {
        resBody.innerText = "$0.00";
        resMonthly.innerText = "$0.00";
        resOverpay.innerText = "$0.00";
        return;
    }

    const loanBody = selectedPrice - downPayment;
    const rate = term === 12 ? 0.05 : term === 36 ? 0.08 : 0.12;

    const overpayment = loanBody * rate;
    const totalToPay = loanBody + overpayment;
    const monthlyPayment = totalToPay / term;

    resBody.innerText = $${loanBody.toLocaleString()};
    resMonthly.innerText = $${monthlyPayment.toFixed(2)};
    resOverpay.innerText = $${overpayment.toLocaleString()};

    return {
        name: selectedName,
        price: selectedPrice,
        downPayment: downPayment,
        monthly: monthlyPayment.toFixed(2),
        totalDebt: totalToPay
    };
}

saveBtn.addEventListener('click', () => {
    const currentCalculation = calculateLeasing();

    if (!currentCalculation) {
        alert('Будь ласка, спочатку оберіть автомобіль з каталогу!');
        return;
    }

    if (+downPaymentInput.value >= selectedPrice) {
        alert('Помилка: Перший внесок занадто великий!');
        return;
    }

    const creditData = {
        carName: currentCalculation.name,
        totalDebt: currentCalculation.totalDebt,
        monthlyPayment: +currentCalculation.monthly,
        totalPaid: 0,
        history: []
    };

    localStorage.setItem('active_credit', JSON.stringify(creditData));
    alert('Фінансовий договір оформлено! Дані успішно передані в Мій Фінансовий Дашборд.');
});
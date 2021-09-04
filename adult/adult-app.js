
let budgetDiv = document.querySelector('.budget-div')
let calcDiv = document.querySelector('.calc-div')

let calcBtn = document.querySelector('.calc-btn')
let budgetBtn = document.querySelector('.budget-btn')

calcBtn.addEventListener('click', handleCalcTabClick)
budgetBtn.addEventListener('click', handleBudgetTabClick)

function toggleClass(element, className) {
    element.classList.toggle(className)
}

function toggleTab() {
    toggleClass(calcBtn, 'unselected')
    toggleClass(calcBtn, 'selected')
    toggleClass(budgetBtn, 'unselected')
    toggleClass(budgetBtn, 'selected')
}

function handleBudgetTabClick() {
    if (calcDiv.classList.contains('disp-none')) {
        toggleClass(calcDiv, 'disp-none')
        toggleClass(budgetDiv, 'disp-none')
        toggleTab()
    }
}

function handleCalcTabClick() {
    if (budgetDiv.classList.contains('disp-none')) {
        toggleClass(calcDiv, 'disp-none')
        toggleClass(budgetDiv, 'disp-none')
        toggleTab()
    }
}

// select objects
let balanceSpan = document.querySelector('.balance')
let wholeH2 = document.querySelector('h2')

let withdrawInput = document.querySelector('.withdraw-input')
let withdrawBtn = document.querySelector('.withdraw-btn')

let depositInput = document.querySelector('.deposit-input')
let depositBtn = document.querySelector('.deposit-btn')

// make objects listen
withdrawBtn.addEventListener('click', handleWithdraw)
depositBtn.addEventListener('click', handleDeposit)

// do things with listening objects


function resetInput(inputBox) {
    inputBox.value = ''
}

function checkZero() {
    let balance = Number(balanceSpan.textContent)
    if (balance > 0 ) {
        wholeH2.style.color = 'black';
    } else {
        wholeH2.style.color = 'red';
    }
}

function handleWithdraw() {
    let withdrawAmount = Number(withdrawInput.value)
    let balance = Number(balanceSpan.textContent)
    balanceSpan.textContent = withdrawMoney(withdrawAmount, balance)
    resetInput(withdrawInput)
    console.log(balance)
    checkZero()
    updateChart()
}

function withdrawMoney(amount=0, balance) {
    let newTotal = balance - amount
    return (newTotal < 0 ? balance : newTotal)
}

function handleDeposit() {
    let depositAmount = Number(depositInput.value)
    let balance = Number(balanceSpan.textContent)
    balanceSpan.textContent = depositMoney(depositAmount, balance)
    resetInput(depositInput)
    checkZero()
    updateChart()
}

function depositMoney(amount=0, balance) {
    return balance + amount
}

// MYCHART FUNCTIONS
let chartCounter = 0

function updateChart() {
    let balance = Number(balanceSpan.textContent)
    data.datasets[0].data.push(balance)
    labels.push(chartCounter)
    myChart.update()
    chartCounter++
}

const labels = [];

const data = {
    labels: labels,
    datasets: [{
      label: 'Balance',
      backgroundColor: 'rgb(247, 92, 3)',
      borderColor: 'rgb(247, 92, 3)',
      fill: false,
      data: [],
    }]
};

const config = {
    type: 'line',
    data,
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Balance in $'
                }
            }]
        }
    }
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

// BUDGET FUNCTIONS
let budgetLabels = []

const budgetData = {
    labels: budgetLabels,
    datasets: [{
      label: 'Balance',
      backgroundColor: 'rgb(247, 92, 3)',
      borderColor: 'rgb(247, 92, 3)',
      fill: false,
      data: [],
    }]
};

const budgetConfig = {
    type: 'line',
    data: budgetData,
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '$ Amount Saved'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Number of Weeks'
                }
            }]
        }
    }
}

var budgetChart = new Chart(document.getElementById('budgetChart'), budgetConfig
);

// select objects
let makeBudgetBtn = document.querySelector('.make-budget-btn')

let incomeInput = document.querySelector('.income-input')
let spendingInput = document.querySelector('.spending-input')
let balanceInput = document.querySelector('.balance-input')


// make objects listen
makeBudgetBtn.addEventListener('click', handleMakeBudget)

function makeBudgetData(income, spending, numWeeks, startBalance) {
    let budgetDataArray = [startBalance]
    let weeklyTotal = income - spending
    while (numWeeks > 0) {
        startBalance += weeklyTotal
        budgetDataArray.push(startBalance)
        numWeeks--
    }
    return budgetDataArray
}

function calcNumWeeks(timeFrame) {
    if (timeFrame === 1) {
        return 52
    } else if (timeFrame === 3) {
        return 12
    } else if (timeFrame === 6) {
        return 24
    }
}

function updateBudgetData(dataArray) {
    dataArray.forEach(entry => budgetData.datasets[0].data.push(entry))
}

function handleMakeBudget() {
    if (budgetLabels.length !== 0) {
        budgetData.datasets[0].data.length = 0
        budgetLabels.length = 0
        budgetChart.update()
    }
    let income = Number(incomeInput.value)
    let spending = Number(spendingInput.value)
    let startBalance = Number(balanceInput.value)
    let timeFrame = Number(document.querySelector('input[name = "time-frame"]:checked').value)

    let numWeeks = calcNumWeeks(timeFrame)

    let budgetDataArray = makeBudgetData(income, spending, numWeeks, startBalance)


    budgetLabels.push(...Array(numWeeks).keys())

    updateBudgetData(budgetDataArray)

    budgetChart.update()
}
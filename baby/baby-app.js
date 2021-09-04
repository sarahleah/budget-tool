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



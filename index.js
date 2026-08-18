document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

function iniciarApp() {
    calculadora();
}

function calculadora() {
    let currentValue = '';
    let previousValue = '';
    let operator = null;
    let result = '';
    const numberButton = document.querySelectorAll('.number');
    const operatorButton = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('#equals');
    const deleteButton = document.querySelector('#delete');
    const display = document.querySelector('#display');
    const historyList = document.querySelector('#history');

    numberButton.forEach(button => {
        button.addEventListener('click', function() {
            currentValue += button.textContent;
            display.value = currentValue;
            if(previousValue) {
                display.value = '';
                display.value += previousValue;
                display.value += operator;
                display.value += currentValue;
            }
        })   
    });

    operatorButton.forEach(button => {
        button.addEventListener('click', function() {
            const selectedOperator = button.textContent;
            if(selectedOperator === '-' && currentValue === '') {
                currentValue = '-';
                display.value = currentValue;
                return;
            }
            if(currentValue) {
                previousValue = currentValue;
                currentValue = '';
                operator = button.textContent;
                display.value += operator;
            }
        })
    });

    equalsButton.addEventListener('click', function() {
        if (!previousValue || !currentValue || !operator) {
            return;
        }

        const num1 = Number(previousValue);
        const num2 = Number(currentValue);

        switch(operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if(num2 === 0) {
                    result = 'No se puede dividir';
                    break;
                }
                result = num1 / num2;
                break;
        }

        display.value = result;
        const newLi = document.createElement('LI');
        const operationText = previousValue + operator + currentValue + "=" + result;
        newLi.textContent = operationText;
        historyList.prepend(newLi);
        currentValue = result;
        previousValue = '';
        operator = null;
    })

    deleteButton.addEventListener('click', function() {
        currentValue = '';
        previousValue = '';
        operator = '';
        result = '';
        display.value = '';
    })
}
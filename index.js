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
    const numberButton = document.querySelectorAll('#number');
    const operatorButton = document.querySelectorAll('#operator');
    const equalsButton = document.querySelector('#equals');
    const deleteButton = document.querySelector('#delete');
    const display = document.querySelector('#display');

    for (const button of numberButton) {
        button.addEventListener('click', function() {
            currentValue += button.textContent;
            display.value = currentValue;
            if(previousValue) {
                display.value = '';                display.value += previousValue;
                display.value += operator;
                display.value += currentValue;
            }
        })   
    }

    for (const button of operatorButton) {
        button.addEventListener('click', function() {
            previousValue = currentValue;
            currentValue = '';
            operator = button.textContent;
            display.value += operator;
        })   
    }

    equalsButton.addEventListener('click', function() {
        const num1 = Number(previousValue);
        const num2 = Number(currentValue);
        let result = '';

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
                result = num1 / num2;
                break;
        }

        display.value = result;
    })

    deleteButton.addEventListener('click', function() {
        currentValue = '';
        previousValue = '';
        display.value = '';
    })
}

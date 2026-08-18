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
    const pointButton = document.querySelector('#point');
    const equalsButton = document.querySelector('#equals');
    const deleteButton = document.querySelector('#delete');
    const cleanButton = document.querySelector('#clean');
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

        display.value = Number(result).toFixed(2);
        const newLi = document.createElement('LI');
        const operationText = previousValue + operator + currentValue + "=" + Number(result).toFixed(2);
        newLi.textContent = operationText;
        historyList.prepend(newLi);
        currentValue = result;
        previousValue = '';
        operator = null;
    })

    pointButton.addEventListener('click', function() {
        if(!currentValue.includes('.')) {
            currentValue += '.';
            display.value = currentValue;
        }
        if(previousValue) {
            display.value = previousValue + operator + currentValue;
        }

    })
    
    deleteButton.addEventListener('click', function() {
        if((currentValue) || (previousValue && operator)) {
            currentValue = currentValue.slice(0, -1);
            display.value = display.value.slice(0, -1);
        }
    });

    cleanButton.addEventListener('click', function() {
        currentValue = '';
        previousValue = '';
        operator = '';
        result = '';
        display.value = '';
    })
}
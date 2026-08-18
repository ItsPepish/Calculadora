document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

function iniciarApp() {
    calculadora();
}

function calculadora() {
    let textOperation = '';
    const inputsButtons = document.querySelectorAll('.input-button');
    const parenthesisButton = document.querySelector('#parenthesis');
    const cleanButton = document.querySelector('#clean');
    const deleteButton = document.querySelector('#delete');
    const equalsButton = document.querySelector('#equals');
    const display = document.querySelector('#display');
    const historyList = document.querySelector('#history');

    inputsButtons.forEach(button => {
        button.addEventListener('click', function() {
            textOperation = display.value;
            textOperation += button.textContent;
            display.value = textOperation;
        })
    })

    parenthesisButton.addEventListener('click', function() {
        if(!textOperation.includes('(')) {
            textOperation += '(';
            display.value = textOperation;
        } else {
            textOperation += ')';
            display.value = textOperation;
        }
    })

    equalsButton.addEventListener('click', function() {
        const eval = evaluateExpression(textOperation);
        const reordered = reorderExpression(eval);
        const result = resultExpression(reordered);
        display.value = result;
        const newLi = document.createElement('LI');
        const operationText = textOperation + "=" + result;
        newLi.textContent = operationText;
        historyList.prepend(newLi);
    })

    function evaluateExpression(textOperation) {
        const chars = [];
        let currentNumber = '';

        for(const char of textOperation) {
            if(!isNaN(char) || char === '.') {
                currentNumber += char;
                continue;
            }
            if(currentNumber !== '') {
                chars.push(currentNumber);
                currentNumber = '';
            }
            chars.push(char);
        }
        if(currentNumber !== '') {
            chars.push(currentNumber);
        }
        return chars;
    }

    function precedence(operator) {
        switch(operator) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
            case '%':
                return 2;
            default:
                return 0;
        }
    }

    function reorderExpression(chars) {
        const output = [];
        const operators = [];

        for(const char of chars) {
            if(!isNaN(char)) {
                output.push(char);
                continue;
            }
            if(char === '(') {
                operators.push(char);
                continue;
            }
            if(char === ')') {
                while(operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                operators.pop();
                continue;
            }
            while(operators.length > 0 && operators[operators.length - 1] !== '(' && precedence(operators[operators.length - 1]) >= precedence(char)) {
                output.push(operators.pop());
            }
            operators.push(char);
        }
        while(operators.length > 0) {
            output.push(operators.pop());
        }
        return output;
    }

    function resultExpression(chars) {
        const stack = [];

        for(const char of chars) {
            if(!isNaN(char)) {
                stack.push(Number(char));
                continue;
            }

            const a = stack.pop();
            const b = stack.pop();

            let result;

            switch(char) {
                case '+':
                    result = b + a;
                    break;
                case '-':
                    result = b - a;
                    break;
                case '*':
                    result = b * a;
                    break;
                case '/':
                    if(b === 0) {
                        result = 'No se puede dividir';
                        break;
                    }
                    result = b / a;
                    break;
                case '%':
                    result = b % a;
                    break;
            }
            stack.push(result);
        }
        return stack.pop();
    }

    cleanButton.addEventListener('click', function() {
        textOperation = '';
        display.value = '';
    })

    deleteButton.addEventListener('click', function() {
        display.value = display.value.slice(0, -1);
    });
}
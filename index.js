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

    display.addEventListener('input', function() {
        textOperation = display.value;
    })

    display.addEventListener('keydown', function(event) {
        if(event.key === 'Enter') {
            calculateOperation();
        }
    })

    inputsButtons.forEach(button => {
        button.addEventListener('click', function() {
            textOperation = display.value;
            textOperation += button.textContent;
            display.value = textOperation;
        })
    })

    parenthesisButton.addEventListener('click', function() {
        let parenthesisOpen = 0;
        let parenthesisClosed = 0;

        for (const char of textOperation) {
            if(char === '(') {
                parenthesisOpen++;
            }
            if(char === ')') {
                parenthesisClosed++;
            }
        }

        const lastChar = textOperation[textOperation.length - 1];

        if(!lastChar) {
            textOperation += '(';
        } else if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
            textOperation += '(';
        } else if (parenthesisOpen > parenthesisClosed) {
            textOperation += ')';
        } else {
            textOperation += '(';
        }
        display.value = textOperation;
    })

    equalsButton.addEventListener('click', function() {
        calculateOperation();
    })

    function evaluateExpression(textOperation) {
        const chars = [];
        let currentNumber = '';

        for(let i = 0; i < textOperation.length; i++) {
            const char = textOperation[i];
            const previousChar = textOperation[i - 1];

            if(!isNaN(char) || char === '.') {
                if(previousChar === ')') {
                    chars.push('*');
                }
                currentNumber += char;
                continue;
            }
            if(char === '(' && currentNumber !== '') {
                chars.push(currentNumber);
                chars.push('*');
                currentNumber = '';
            }
            if(char === '(' && previousChar === ')') {
                chars.push('*');
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
                    if(a === 0) {
                        result = 'No se puede dividir entre cero';
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

    function calculateOperation() {
        const eval = evaluateExpression(textOperation);
        console.log(eval);
        const reordered = reorderExpression(eval);
        const result = resultExpression(reordered);
        display.value = result;
        const newLi = document.createElement('LI');
        const operationText = textOperation + " = " + result;
        newLi.textContent = operationText;
        historyList.prepend(newLi);
        textOperation = String(result);
    }

    cleanButton.addEventListener('click', function() {
        textOperation = '';
        display.value = '';
    })

    deleteButton.addEventListener('click', function() {
        display.value = display.value.slice(0, -1);
        textOperation = display.value;
    });
}
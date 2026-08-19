// Esperar a que HTML y DOM se cargue por completo
document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

// Función que ejecuta las funciones una vez cargada la página
function iniciarApp() {
    calculadora();
}

// Función principal de la calculadora
function calculadora() {
    let textOperation = '';
    const inputsButtons = document.querySelectorAll('.input-button');
    const parenthesisButton = document.querySelector('#parenthesis');
    const cleanButton = document.querySelector('#clean');
    const deleteButton = document.querySelector('#delete');
    const equalsButton = document.querySelector('#equals');
    const display = document.querySelector('#display');
    const historyList = document.querySelector('#history');

    // Agregar evento de teclado, en cualquier boton, para agregar numeros y operadores a la pantalla
    display.addEventListener('input', function() {
        textOperation = display.value;
    })

    // Agregar evento de tecla Enter, para mandar a llamar a la función que calcula la operación mostrada en la pantalla
    display.addEventListener('keydown', function(event) {
        if(event.key === 'Enter') {
            // En caso de que la pantalla está vacia, no se ejecuta nada
            if(textOperation === '') {
                display.value = '';
                return;
            }
            calculateOperation();
        }
    })

    // Agregar evento de click de Igual ("="), para mandar a llamar a la función que calcula la operación mostrada en la pantalla
    equalsButton.addEventListener('click', function() {
        // En caso de que la pantalla está vacia, no se ejecuta nada
        if(textOperation === '') {
            display.value = '';
            return;
        }
        calculateOperation();
    })

    // Agregar evento de botones de calculadora, para agregar numeros y operadores a la pantalla
    inputsButtons.forEach(button => {
        button.addEventListener('click', function() {
            textOperation = display.value;
            textOperation += button.textContent;
            display.value = textOperation;
        })
    })

    // Agregar evento del boton de Parentesis ("()"), para agregarlo a la pantalla
    parenthesisButton.addEventListener('click', function() {
        // Se inicializa variables para guardar cuantos parentesis lleva abiertos y cerrados
        let parenthesisOpen = 0;
        let parenthesisClosed = 0;

        // Para en cada caracter de la operación mostrada en la pantalla, se cuenta los parentesis abiertos y cerrados
        for (const char of textOperation) {
            if(char === '(') {
                parenthesisOpen++;
            }
            if(char === ')') {
                parenthesisClosed++;
            }
        }

        // Esto con la finalidad de guardar el caracter pasado en la operacion, para realizar condiciones relacionados con parentesis
        const lastChar = textOperation[textOperation.length - 1];

        // Si en la pantalla no hay nada ni hay caracter pasado, se agrega "("
        if(!lastChar) {
            textOperation += '(';
        } else if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') { // Si el caracter pasado fue una operacion, agregar "("
            textOperation += '(';
        } else if (parenthesisOpen > parenthesisClosed) { // Si hay mas parentesis abiertos que cerrados, se agrega ")"
            textOperation += ')';
        } else { // Caso contrario, se agrega "("
            textOperation += '(';
        }

        // Agregar el parentesis correspondiente a la pantalla
        display.value = textOperation;
    })

    // Funcion que tokeniza la operacion, es decir, separar los numeros entre operaciones y guardarlo en un arreglo
    function evaluateExpression(textOperation) {
        const chars = [];
        const operators = ['+', '-', '*', '/', '%'];
        let currentNumber = '';

        for(let i = 0; i < textOperation.length; i++) {
            const char = textOperation[i];
            const previousChar = textOperation[i - 1];
            const doublePreviousChar = textOperation[i - 2];

            if(!isNaN(char) || char === '.') {
                if(previousChar === ')') {
                    chars.push('*');
                }
                if (previousChar === '-' && (doublePreviousChar === undefined || doublePreviousChar === '(')) {
                    chars.pop(previousChar);
                    currentNumber += '-';
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
        const reordered = reorderExpression(eval);
        const result = resultExpression(reordered);
        display.value = result;
        const newLi = document.createElement('LI');
        const operationText = textOperation + " = " + result;
        newLi.textContent = operationText;
        newLi.classList.add('bg-gray-800', 'rounded-2xl', 'px-4', 'py-2')
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
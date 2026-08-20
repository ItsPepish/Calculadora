// Esperar a que se cargue todo el HTML antes de ejecutar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

// Función que ejecuta las funciones una vez cargada la página
function iniciarApp() {
    calculadora();
}

// Función principal de la calculadora
function calculadora() {
    let textOperation = ''; // Variable que guarda la operación actual
    const inputsButtons = document.querySelectorAll('.input-button'); // Variable que selecciona todos los botones de numeros, punto y operadores
    const parenthesisButton = document.querySelector('#parenthesis'); // Variable que selecciona el botón de parentesis
    const cleanButton = document.querySelector('#clean'); // Variable que selecciona el botón de limpiar la pantalla y la operación
    const deleteButton = document.querySelector('#delete'); // Variable que selecciona el botón de limpiar carácter por carácter
    const equalsButton = document.querySelector('#equals');  // Variable que selecciona el botón de resolver operación
    const display = document.querySelector('#display'); // Variable que selecciona el input, simulando la pantalla de calculadora
    const historyList = document.querySelector('#history'); // Variable que selecciona la lista, para mostrar el historial de operaciones

    // Agregar evento para el input, asi el usuario puede escribir directamente en el display y se sincroniza la operacion con lo que esta en la pantalla
    display.addEventListener('input', function() {
        textOperation = display.value;
    })

    // Agregar evento para la tecla Enter, para mandar a llamar a la función que calcula la operación mostrada en la pantalla
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

    // Agregar evento de click para el botón Igual ("="), para mandar a llamar a la función que calcula la operación mostrada en la pantalla
    equalsButton.addEventListener('click', function() {
        // En caso de que la pantalla está vacia, no se ejecuta nada
        if(textOperation === '') {
            display.value = '';
            return;
        }
        calculateOperation();
    })

    // Agregar evento de click para cada botón de calculadora, para tomar el texto del botón y agregarlo a la operación
    inputsButtons.forEach(button => {
        button.addEventListener('click', function() {
            textOperation = display.value;
            textOperation += button.textContent;
            display.value = textOperation;
        })
    })

    // Agregar evento de click para el botón de Parentesis ("()"), para agregarlo a la operación en la pantalla
    parenthesisButton.addEventListener('click', function() {
        // Se inicializa variables para guardar cuantos parentesis lleva abiertos y cerrados
        let parenthesisOpen = 0;
        let parenthesisClosed = 0;

        // Se recorre cada carácter de la operación mostrada en la pantalla, se cuenta los parentesis abiertos y cerrados
        for (const char of textOperation) {
            if(char === '(') {
                parenthesisOpen++;
            }
            if(char === ')') {
                parenthesisClosed++;
            }
        }

        // Se guarda el ultimo carácter para decidir si corresponde abrir o cerrar paréntesis
        const lastChar = textOperation[textOperation.length - 1];

        // Si en la pantalla no hay nada ni hay último carácter, se agrega "("
        if(!lastChar) {
            textOperation += '(';
        } else if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') { // Si el último carácter fue una operador, agregar "("
            textOperation += '(';
        } else if (parenthesisOpen > parenthesisClosed) { // Si hay mas parentesis abiertos que cerrados, se agrega ")"
            textOperation += ')';
        } else { // Caso contrario, se agrega "("
            textOperation += '(';
        }

        // Se muestra en pantalla el paréntesis agregado
        display.value = textOperation;
    })

    // Funcion que recibe la operación como texto y separarlas en partes como tokens: números, operadores y paréntesis
    function evaluateExpression(textOperation) {
        const chars = []; // Arreglo donde se guardarán todos los tokens de la operación
        const operators = ['+', '-', '*', '/', '%']; // Arreglo de operadores válidos
        let currentNumber = ''; // Variable temporal para formar números de más de un dígito o decimales

        for(let i = 0; i < textOperation.length; i++) {
            const char = textOperation[i]; // Carácter actual que se está revisando
            const previousChar = textOperation[i - 1]; // Carácter anterior
            const doublePreviousChar = textOperation[i - 2]; // Dos caracteres anteriores

            // Si el carácter actual es un número o punto decimal, se agrega a currentNumber
            if(!isNaN(char) || char === '.') {
                // Si antes del número había un ")", se agrega una multiplicación implícita
                if(previousChar === ')') {
                    chars.push('*');
                }
                // Si el número tiene un "-" antes y está al inicio o después de "(", se toma como número negativo, no como una resta
                if (previousChar === '-' && (doublePreviousChar === undefined || doublePreviousChar === '(')) {
                    // Se elimina el "-" que ya se había guardado como operador
                    chars.pop();
                    currentNumber += '-';
                }
                currentNumber += char;
                continue;
            }

            // Si aparece "(" justo después de un número, se agrega una multiplicación implícita
            if(char === '(' && currentNumber !== '') {
                chars.push(currentNumber);
                chars.push('*');
                currentNumber = '';
            }
            // Si aparece "(" justo después de ")", también se agrega multiplicación implícita
            if(char === '(' && previousChar === ')') {
                chars.push('*');
            }
            // Si ya se terminó de formar un número, se guarda en el arreglo de tokens y se limpia currentNumber para empezar otro número después
            if(currentNumber !== '') {
                chars.push(currentNumber);
                currentNumber = '';
            }
            // Se guarda el carácter actual cuando es un operador o paréntesis
            chars.push(char);
        }
        // Si la operación termina con un número, se agrega ese último número al arreglo
        if(currentNumber !== '') {
            chars.push(currentNumber);
        }
        return chars;
    }

    // Función que devuelve la prioridad de cada operador matemático
    function precedence(operator) {
        switch(operator) {
            case '+':
            case '-':
                // La suma y resta tienen menor prioridad
                return 1;
            case '*':
            case '/':
            case '%':
                // Multiplicación, división y módulo tienen mayor prioridad
                return 2;
            default:
                // Si no es un operador reconocido, devuelve 0
                return 0;
        }
    }

    // Función que reordena los tokens para respetar la prioridad de operadores y paréntesis
    function reorderExpression(chars) {
        const output = []; // Arreglo donde se guarda la expresión ya reordenada
        const operators = []; // Pila temporal donde se guardan operadores y paréntesis

        for(const char of chars) {
            // Si el token es un número, se agrega directamente a la salida
            if(!isNaN(char)) {
                output.push(char);
                continue;
            }
             // Si el token es "(", se guarda en la pila de operadores
            if(char === '(') {
                operators.push(char);
                continue;
            }
            // Si el token es ")", se sacan operadores hasta encontrar el "(" correspondiente
            if(char === ')') {
                while(operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                // Se elimina el "(" de la pila, porque ya se cerró el paréntesis
                operators.pop();
                continue;
            }
            // Si el operador actual tiene menor o igual prioridad que el último operador guardado, se pasa ese operador a la salida antes de guardar el actual
            while(operators.length > 0 && operators[operators.length - 1] !== '(' && precedence(operators[operators.length - 1]) >= precedence(char)) {
                output.push(operators.pop());
            }
            // Se guarda el operador actual en la pila
            operators.push(char);
        }
        // Al final, se vacían los operadores que quedaron pendientes
        while(operators.length > 0) {
            output.push(operators.pop());
        }
        return output;
    }

    // Función que calcula el resultado final usando una pila
    function resultExpression(chars) {
        const stack = []; // Pila donde se guardan los números y resultados parciales

        for(const char of chars) {
            // Si el token es un número, se convierte a Number y se guarda en la pila
            if(!isNaN(char)) {
                stack.push(Number(char));
                continue;
            }

            // Si el token es un operador, se sacan los dos últimos números de la pila
            const a = stack.pop(); // Segundo número de la operación, lado derecho
            const b = stack.pop(); // Primer número de la operación, lado izquierdo

            let result; // Variable donde se guarda el resultado parcial

            switch(char) {
                case '+':
                    // Suma los dos valores
                    result = b + a;
                    break;
                case '-':
                    // Resta los dos valores
                    result = b - a;
                    break;
                case '*':
                    // Multiplica los dos valores
                    result = b * a;
                    break;
                case '/':
                    // Verifica que el divisor no sea cero
                    if(a === 0) {
                        result = 'No se puede dividir entre cero';
                        break;
                    }
                    // Divide los dos valores
                    result = b / a;
                    break;
                case '%':
                    // Calcula el residuo de los dos valores
                    result = b % a;
                    break;
            }
            // Guarda el resultado parcial para seguir calculando
            stack.push(result);
        }
        // Al final solo queda un valor en la pila: el resultado final
        return stack.pop();
    }

    // Función que ejecuta todo el proceso para calcular la operación actual
    function calculateOperation() {
        // Se separa la operación en tokens: números, operadores y paréntesis
        const eval = evaluateExpression(textOperation);
        // Se reordenan los tokens para respetar la prioridad de operadores y paréntesis
        const reordered = reorderExpression(eval);
        // Se calcula el resultado final usando la expresión reordenada
        const result = resultExpression(reordered);
        // Se muestra el resultado en el display
        display.value = result;
        // Se crea un nuevo elemento de lista para guardar la operación en el historial
        const newLi = document.createElement('LI');
        // Se arma el texto que se mostrará en el historial
        const operationText = textOperation + " = " + result;
        // Se asigna el texto al elemento del historial
        newLi.textContent = operationText;
        // Se agregan estilos al elemento del historial
        newLi.classList.add('bg-gray-800', 'rounded-2xl', 'px-4', 'py-2');
        // Se agrega el nuevo cálculo al inicio del historial
        historyList.prepend(newLi);
        // Se guarda el resultado como nueva operación actual para poder seguir calculando
        textOperation = String(result);
    }

    // Evento del botón C, encargado de limpiar toda la operación actual
    cleanButton.addEventListener('click', function() {
        textOperation = '';
        display.value = '';
    })

    // Evento del botón de borrar, encargado de eliminar el último carácter escrito
    deleteButton.addEventListener('click', function() {
        display.value = display.value.slice(0, -1);
        textOperation = display.value;
    });
}
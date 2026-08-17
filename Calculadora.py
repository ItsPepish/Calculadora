print('Calculadora básica')
print('Escoje que operacion deseas realizar')
print('1. Suma')
print('2. Resta')
print('3. Multiplicación')
print('4. División')
operacion = input("Elección: ")

match operacion:
        case '1':
            num1 = float(input("Ingrese el primer numero: "))
            num2 = float(input("Ingrese el segundo numero: "))
            resultado = num1 + num2
            print("El resultado de la suma es: ", resultado)
        case '2':
            num1 = float(input("Ingrese el primer numero: "))
            num2 = float(input("Ingrese el segundo numero: "))
            resultado = num1 - num2
            print("El resultado de la resta es: ", resultado)
        case '3':
            num1 = float(input("Ingrese el primer numero: "))
            num2 = float(input("Ingrese el segundo numero: "))
            resultado = num1 * num2
            print("El resultado de la multiplicación es: ", resultado)
        case '4':
            num1 = float(input("Ingrese el primer numero: "))
            num2 = float(input("Ingrese el segundo numero: "))
            resultado = num1 / num2
            print("El resultado de la división es: ", resultado)
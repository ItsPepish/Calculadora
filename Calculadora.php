<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $numero1 = (float)$_POST['Num1']    ;
        $numero2 = (float) $_POST['Num2'];
        $operacion = $_POST['Operacion'];

        switch($operacion) {
            case 'Suma':
                $resultado = $numero1 + $numero2;
                break;
            case 'Resta':
                $resultado = $numero1 - $numero2;
                break;
            case 'Multiplicacion':
                $resultado = $numero1 * $numero2;
                break;
            case 'Division':
                if($numero2 == 0) {
                    $resultado = 'No se puede dividir entre cero';
                } else {
                    $resultado = $numero1 / $numero2;
                }
                break;
        }
    }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>Calculadora</title>
</head>
<body>
    <h1>Calculadora básica</h1>
    <form action="" method="POST">
        <h2>Selecciona la operación a realizar</h2>
        <select name="Operacion">
            <option value="Suma">Suma</option>
            <option value="Resta">Resta</option>
            <option value="Multiplicacion">Multiplicación</option>
            <option value="Division">División</option>
        </select>
        <input type="number" name="Num1" required>
        <input type="number" name="Num2" required>
        <button type="submit">Calcular</button>
    </form>
    <?php

    if(isset($resultado) && $resultado !== null): ?>
    <p>Resultado: <?= $resultado ?> </p>
    <?php endif; ?>
</body>
</html>
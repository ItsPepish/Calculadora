<?php
    $numeros = [9,8,7,6,5,4,3,2,1,0];
    $operadores = ["+", "-", "*", "/"];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script src="index.js"></script>
    <title>Calculadora</title>
</head>
<body>
    <div class="w-100 bg-gray-500 p-5 flex flex-col gap-5">
        <input type="text" id="display" readonly class="h-20 bg-black text-white px-5 text-4xl">
        <div class="flex gap-5">
            <div class="grid grid-cols-3 gap-5">
                <?php for($i = 0; $i < count($numeros); $i++): ?>
                <button type="button" id="number" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer"><?php echo $numeros[$i] ?></button>
                <?php endfor; ?>
                <button type="button" id="equals" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer">=</button>
                <button type="button" id="delete" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer">C</button>
            </div>
            <div class="flex flex-col gap-5">
                <?php for($i = 0; $i < count($operadores); $i++): ?>
                <button type="button" id="operator" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer"><?php echo $operadores[$i] ?></button>
                <?php endfor; ?>
            </div>
        </div>
    </div>
</body>
</html>
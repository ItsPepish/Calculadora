<?php
    $numeros = [9,8,7,6,5,4,3,2,1];
    $operadores = ["/", "*", "-", "+"];
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
<body class="flex h-screen justify-center items-center">
    <div class="w-fit bg-gray-500 p-5 flex gap-5 rounded-xl">
        <div class="flex flex-col gap-5">
            <input type="text" id="display" readonly class="w-fit h-20 bg-black text-white text-4xl px-5 rounded-xl">
            <div class="flex gap-5 justify-center">
                <div class="grid grid-cols-3 gap-5 ">
                    <button type="button" id="clean" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer">C</button>
                    <button type="button" id="delete" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer"><-</button>
                    <button type="button" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer operator">%</button>

                    <?php foreach($numeros as $numero): ?>
                    <button type="button" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer number"><?php echo $numero ?></button>
                    <?php endforeach; ?>
                    <button type="button" id="parenthesis" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer">()</button>
                    <button type="button" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer number">0</button>
                    <button type="button" id="point" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer">.</button>

                </div>
                <div class="flex flex-col gap-5">
                    <?php foreach($operadores as $operador): ?>
                    <button type="button" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer operator"><?php echo $operador ?></button>
                    <?php endforeach; ?>
                    <button type="button" id="equals" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-semibold text-4xl cursor-pointer">=</button>
                </div>
            </div>
        </div>
        <div class="bg-black/50 w-fit min-w-50 text-white p-5 text-2xl rounded-xl text-relaxed">
            <ul id="history" class="flex flex-col gap-1"></ul>
        </div>
    </div>
</body>
</html>
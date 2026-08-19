<?php
    $numeros = [9,8,7,6,5,4,3,2,1];
    $operadores = ["%","/", "*", "-", "+"];
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
<!-- <body class="flex h-screen justify-center items-center">
    <div class="w-fit bg-gray-500 p-5 flex gap-5 rounded-xl">
        <div class="flex flex-col gap-5">
            <input type="text" id="display" class="w-fit h-20 bg-black text-white text-4xl px-5 rounded-xl">
            <div class="flex gap-5 justify-center">
                <div class="grid grid-cols-3 gap-5 ">
                    <?php foreach($numeros as $numero): ?>
                    <button type="button" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer input-button"><?php echo $numero ?></button>
                    <?php endforeach; ?>
                    <button type="button" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer input-button">.</button>
                    <button type="button" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer input-button">0</button>
                    <button type="button" id="parenthesis" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer">()</button>
                    <button type="button" id="clean" class="size-20 rounded-full bg-black hover:bg-black/50 text-red-600 font-bold text-4xl cursor-pointer">C</button>
                    <button type="button" id="delete" class="size-20 rounded-full bg-black hover:bg-black/50 text-red-600 font-bold text-4xl cursor-pointer"><-</button>
                    <button type="button" id="equals" class="size-20 rounded-full bg-sky-400/50 hover:bg-sky-400/40 text-sky-200 font-bold text-4xl cursor-pointer">=</button>
                </div>
                <div class="flex flex-col gap-5">
                    <?php foreach($operadores as $operador): ?>
                    <button type="button" class="size-20 rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer input-button"><?php echo $operador ?></button>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="bg-black/50 w-fit min-w-50 text-white p-5 text-2xl rounded-xl text-relaxed">
            <ul id="history" class="flex flex-col gap-1"></ul>
        </div>
    </div>
</body> -->
<body class="bg-gray-800">
    <div class="grid grid-cols-2 h-screen">
        <div class="flex flex-col rounded-2xl m-5 p-5 gap-5 bg-gray-600">
            <input type="text" id="display" class="w-full h-20 bg-black text-white text-4xl px-5 rounded-2xl">
            <div class="flex gap-5 size-full">
                <div class="grid grid-cols-3 gap-5 size-full">
                    <?php foreach($numeros as $numero): ?>
                    <button type="button" class="rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer input-button"><?php echo $numero ?></button>
                    <?php endforeach; ?>
                    <button type="button" class="rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer input-button">.</button>
                    <button type="button" class="rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer input-button">0</button>
                    <button type="button" id="parenthesis" class="rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer">()</button>
                    <button type="button" id="clean" class="rounded-full bg-black hover:bg-black/50 text-red-600 font-bold text-4xl cursor-pointer">C</button>
                    <button type="button" id="delete" class="rounded-full bg-black hover:bg-black/50 text-red-600 font-bold text-4xl cursor-pointer"><-</button>
                    <button type="button" id="equals" class="rounded-full bg-sky-400/50 hover:bg-sky-400/40 text-sky-200 font-bold text-4xl cursor-pointer">=</button>
                </div>
                <div class="flex flex-col gap-5 w-40">
                    <?php foreach($operadores as $operador): ?>
                    <button type="button" class="size-full rounded-full bg-black hover:bg-black/50 text-sky-200 font-bold text-4xl cursor-pointer input-button"><?php echo $operador ?></button>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="flex flex-col rounded-2xl m-5 p-5 bg-gray-600">
            <div class=" size-full text-white p-5 text-4xl rounded-xl text-relaxed">
                <ul id="history" class="flex flex-col gap-1"></ul>
            </div>
        </div>
    </div>
</body>
</html>
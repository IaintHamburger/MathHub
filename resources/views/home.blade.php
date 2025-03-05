<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MathHub</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    @vite(['resources/css/app.css'])
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
    <div class="container">
        <h1 id="title">MathHub</h1>
        <p class="subtitle">一款集結數學題目的網站，專為想練習數學題目的學生所設計！</p>
        <a href="#start" class="btn">開始練習</a>
    </div>

    <script>
        // 過場動畫
        gsap.from("#title", { opacity: 0, y: -50, duration: 1 });
        gsap.from(".subtitle", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
        gsap.from(".btn", { opacity: 1, scale: 0.8, duration: 1, delay: 1 });
    </script>
</body>
</html>
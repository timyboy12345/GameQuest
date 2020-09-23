<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="{{ mix('css/main.css') }}">

    @yield('head')
</head>

<body class="antialiased bg-gray-100">
<nav class="flex items-center justify-between flex-wrap @yield('theme-bg', 'bg-blue-500') p-6 shadow-lg">
    <a href="{{ route('home') }}" class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">{{ config('app.name') }}</span>
    </a>
</nav>

@yield('content')
</body>
</html>

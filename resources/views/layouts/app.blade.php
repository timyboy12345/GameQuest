<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="{{ mix('css/main.css') }}">
</head>

<body class="antialiased bg-gray-100">
<nav class="flex items-center justify-between flex-wrap bg-@yield('theme-bg', 'blue-500') p-6 shadow-lg">
    <a href="{{ route('home') }}" class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">{{ config('app.name') }}</span>
    </a>
    <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-@yield('theme-text', 'teal-200') border-@yield('theme-border', 'teal-400') hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
        </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-@yield('theme-text', 'teal-200') hover:text-white mr-4">
                Over GameQuest
            </a>
            <a href="{{ route('games.games') }}" class="block mt-4 lg:inline-block lg:mt-0 text-@yield('theme-text', 'teal-200') hover:text-white mr-4">
                Games
            </a>
{{--            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-@yield('theme-text', 'teal-200') hover:text-white mr-4">--}}
{{--                Examples--}}
{{--            </a>--}}
{{--            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-@yield('theme-text', 'teal-200') hover:text-white">--}}
{{--                Blog--}}
{{--            </a>--}}
        </div>
    </div>
</nav>

@yield('content')
</body>
</html>

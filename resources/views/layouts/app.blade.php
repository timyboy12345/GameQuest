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
    <div class="block md:hidden">
        <button id="expandMenuButton"
            class="flex items-center px-3 py-2 border rounded @yield('theme-text', 'text-teal-200') @yield('theme-border', 'border-teal-400') hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
        </button>
    </div>
    <div class="w-full block flex-grow md:flex md:items-center md:w-auto hidden md:visible" id="expandableMenu">
        <div class="text-sm md:flex-grow">
            <a href="#responsive-header"
               class="block mt-4 md:inline-block md:mt-0 @yield('theme-text', 'text-teal-200') hover:text-white mr-4">
                Over GameQuest
            </a>
            <a href="{{ route('games.games') }}"
               class="block mt-4 md:inline-block md:mt-0 @yield('theme-text', 'text-teal-200') hover:text-white mr-4">
                Games
            </a>
        </div>
        <div class="text-sm ml-auto">
            @auth
                <a href="{{ route('logout') }}"
                   class="block mt-4 md:inline-block md:mt-0 @yield('theme-text', 'text-teal-200') hover:text-white mr-4">
                    Uitloggen
                </a>
            @else
                <a href="{{ route('login') }}"
                   class="block mt-4 md:inline-block md:mt-0 @yield('theme-text', 'text-teal-200') hover:text-white mr-4">
                    Inloggen
                </a>
                <a href="{{ route('register') }}" class="block mt-4 md:inline-block md:mt-0 @yield('theme-text', 'text-teal-200') hover:text-white mr-4">
                    Registreren
                </a>
            @endauth
        </div>
    </div>
</nav>

@yield('content')

<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>

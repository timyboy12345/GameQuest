@extends('layouts.game')

@section('theme-bg', 'indigo-800')
@section('theme-text', 'white')
@section('theme-border', 'gray-100')

@section('head')
    <link rel="stylesheet" href="{{ mix('css/autocomplete.css') }}" type="text/css">
@endsection

@section('content')
    <div class="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto mt-16 hidden" id="alreadyPlayingCard">
        <div class="card">
            <div class="card-body">
                <div class="card-title text-indigo-900 bold">Er was nog een spel bezig</div>
                <p class="card-text">Wil je dit spel doorzetten, of wil je een nieuw spel starten?</p>

                <h2 class="text-indigo-900 data-name py-4"></h2>
            </div>

            <div class="card-footer">
                <div class="btn btn-indigo cursor-pointer" id="continueGameButton">{{ __("Verder spelen") }}</div>
                <div class="btn btn-indigo cursor-pointer" id="newGameButton">{{ __("Nieuw spel starten") }}</div>
            </div>
        </div>
    </div>

    <div class="w-full mt-16 hidden" id="queueCard">
        <div class="w-10/12 mx-auto flex flex-wrap">
            <div class="w-full">
                <h1 class="text-center text-4xl text-indigo-900 data-name">NAME</h1>
            </div>

            <div class="w-full lg:w-3/4">
                <h3 class="text-gray-800 mx-2">{{ __("Spelers") }}</h3>
                <div class="flex flex-wrap" id="playerList">
                    @for ($i = 0; $i < 12; $i++)
                        <div class="player rounded px-4 py-2 bg-indigo-800 text-white m-2">Test</div>
                    @endfor
                </div>
            </div>

            <div class="w-full lg:w-1/4">
                <div class="card mt-8">
                    <div class="card-body">
                        <h1 class="card-title">Doe mee!</h1>

                        <h3 class="text-sm text-gray-800">Scan de QR code</h3>
                        <img class="w-full" id="queue-qr-canvas">

                        <h3 class="text-sm text-gray-800">Of gebruik de URL</h3>
                        <p class="text-indigo-900">{{ route('games.join', ['']) }}/<span id="data-id"></span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full max-w-xs mx-auto mt-16 hidden" id="loginCard">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="Username">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="******************">
                <p class="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Sign In
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
            </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
        </p>
    </div>

    <script src="{{ mix('js/games/autocomplete/controller.js') }}"></script>
@endsection

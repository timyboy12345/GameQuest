@extends('layouts.game')

@section('theme-bg', 'bg-indigo-800')
@section('theme-text', 'text-white')
@section('theme-border', 'border-gray-100')

@section('head')
    <link rel="stylesheet" href="{{ mix('css/autocomplete.css') }}" type="text/css">
@endsection

@section('content')
    <div class="w-full mix-wl-md mx-auto mt-16 hidden" id="loadingCard">
        <div class="text-center">
            <h1 class="text-indigo-900 text-3xl font-bold">
                {{ __("Leuk dat je er bent!") }}
            </h1>
            <h3 class="text-gray-800 w-10/12 mx-auto">
                {{ __("Even geduld, we zijn je aan het aanmelden bij het spel.") }}
            </h3>

            <p class="text-sm text-gray-600 mt-12 w-9/12 md:w-8/12 lg:w-1/2 mx-auto">
                {{ __("Check zometeen of je je eigen naam op het scherm ziet staan, dan weet je zeker dat je in het juiste spel zit, met de juiste inlogggegevens!") }}
            </p>
        </div>
    </div>

    <div class="w-full mix-wl-md mx-auto mt-16 hidden" id="queueCard">
        <div class="text-center">
            <h1 class="text-indigo-900 text-3xl font-bold">
                {{ __("Je doet mee") }}
            </h1>
            <h3 class="text-gray-800 w-10/12 mx-auto">
                {{ __("Even geduld, je kan vragen beantwoorden zodra het spel wordt gestart.") }}
            </h3>

            <p class="text-sm text-gray-600 mt-12 w-9/12 md:w-8/12 lg:w-1/2 mx-auto">
                {{ __("Het doel van dit spel is het leukste antwoord bedenken. De winnaar is degene met de meeste punten, dus zorg voor leuke opmerkingen.") }}
            </p>
        </div>
    </div>

    <div class="w-full md:max-w-xl mx-auto mt-16 hidden" id="answerCard">
        <div class="bg-white shadow-md md:rounded px-8 pt-6 pb-8 mb-4">
            <p class="text-gray-800 mb-4">Bedenk een grappig, leuk of ongepast antwoord op de vraag hieronder. Het
                antwoord met de meeste punten wint!</p>

            <p class="text-indigo-900 font-bold mb-4" id="question">VRAAG</p>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="answer">
                    {{ __("Jouw antwoord") }}
                </label>
                <input autocomplete="off"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="answer" type="text" placeholder="{{ __("Antwoord") }}">
            </div>
            <div class="flex items-center justify-between">
                <div class="btn btn-indigo" id="submit">
                    {{ __("Insturen") }}
                </div>
            </div>
        </div>

        <p class="text-center text-gray-500 text-xs mb-4">
            &copy;2020 {{ config('app.name') }}. All rights reserved.
        </p>
    </div>

    <div class="w-full md:max-w-xl mx-auto mt-16 text-center hidden" id="votingCard">
        <div class="px-8 pt-6 pb-8 mb-4">
            <h1 class="text-gray-800 mb-4">Stem op het leukste antwoord</h1>
            <h2 class="text-indigo-900 font-bold mb-4" id="question">VRAAG</h2>

            <div class="flex flex-col mt-12" id="votingCardAnswersCard">
                <div
                    class="answer bg-indigo-800 text-white rounded shadow py-2 px-4 cursor-pointer duration-100 hover:bg-indigo-900 hover:shadow-inner">
                    Test
                </div>
            </div>
        </div>
    </div>

    <script src="{{ mix('js/games/autocomplete/player.js') }}"></script>
@endsection

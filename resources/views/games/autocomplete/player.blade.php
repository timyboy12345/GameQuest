@extends('layouts.game')

@section('theme-bg', 'indigo-800')
@section('theme-text', 'white')
@section('theme-border', 'gray-100')

@section('head')
    <link rel="stylesheet" href="{{ mix('css/autocomplete.css') }}" type="text/css">
@endsection

@section('content')
    <div class="w-full max-w-xl mx-auto mt-16 hidden" id="answerCard">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p class="text-gray-800 mb-4">Bedenk een grappig, leuk of ongepast antwoord op de vraag hieronder. Het
                antwoord met de meeste punten wint!</p>

            <p class="text-indigo-900 font-bold mb-4" id="question">VRAAG</p>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="answer">
                    {{ __("Jouw antwoord") }}
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

    <script src="{{ mix('js/games/autocomplete/player.js') }}"></script>
@endsection

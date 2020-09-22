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
                <div class="flex flex-wrap" id="playerList"></div>
            </div>

            <div class="w-full lg:w-1/4">
                <div class="card mt-8">
                    <div class="card-body">
                        <h1 class="card-title">Doe mee!</h1>

                        <h3 class="text-sm text-gray-800">Scan de QR code</h3>
                        <img alt="{{ __("QR code om deel te nemen") }}" class="w-full" id="queue-qr-canvas" src="">

                        <h3 class="text-sm text-gray-800">Of gebruik de URL</h3>
                        <p class="text-indigo-900">{{ route('games.join', ['']) }}/<span id="data-id"></span></p>
                    </div>

                    <div class="card-footer">
                        <div class="btn btn-indigo cursor-pointer" id="startGameButton">
                            Starten
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full mt-16 hidden" id="answersCard">
        <div class="text-center mb-16">
            <h3 class="text-indigo-900 font-bold text-center text-2xl">{{ __("Kijk op je eigen scherm!") }}</h3>
            <p class="text-gray-800">{{ __("Beantwoord de vragen op je eigen apparaat") }}</p>
        </div>

        <div class="w-10/12 mx-auto flex justify-center" id="answersCardPlayers" style="height: 200px;"></div>
    </div>

    <script src="{{ mix('js/games/autocomplete/controller.js') }}"></script>
@endsection

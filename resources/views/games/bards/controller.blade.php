@extends('layouts.game')

@section('theme-bg', 'bg-gray-900')
@section('theme-text', 'text-white')
@section('theme-border', 'border-gray-100')

@section('head')
    <link rel="stylesheet" href="{{ mix('css/autocomplete.css') }}" type="text/css">
    <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css"
          integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" crossorigin="anonymous">
@endsection

@section('content')
    <div class="w-full my-24 hidden" id="loadingCard">
        <div class="flex flex-col text-center">
            <h1 class="text-xl text-gray-900 mb-8 font-bold" data-default="{{ __("Bijna klaar") }}"></h1>
            <i class="text-gray-900 mx-auto fas fa-circle-notch fa-spin fa-5x"></i>
        </div>
    </div>

    <div class="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto mt-16 hidden" id="alreadyPlayingCard">
        <div class="card">
            <div class="card-body">
                <div class="card-title text-gray-900 bold">Er was nog een spel bezig</div>
                <p class="card-text">Wil je dit spel doorzetten, of wil je een nieuw spel starten?</p>

                <h2 class="text-gray-900 data-name pt-4 font-bold">SPELNAAM</h2>
                <p class="text-sm text-gray-600 pb-4">We kunnen proberen dit spel door te zetten, maar het zou kunnen
                    dat dit niet meer kan.</p>
            </div>

            <div class="card-footer">
                <div class="btn btn-gray cursor-pointer" id="continueGameButton">{{ __("Verder spelen") }}</div>
                <div class="btn btn-gray cursor-pointer" id="newGameButton">{{ __("Nieuw spel starten") }}</div>
            </div>
        </div>
    </div>

    <div class="w-full mt-16 hidden" id="queueCard">
        <div class="w-10/12 mx-auto flex flex-wrap">
            <div class="w-full">
                <h1 class="text-center text-4xl text-gray-900 data-name">NAME</h1>
            </div>

            <div class="w-full md:w-3/4">
                <h3 class="text-gray-800 mx-2">{{ __("Spelers") }}</h3>
                <div class="flex flex-wrap" id="playerList"></div>
            </div>

            <div class="w-full md:w-1/4">
                <div class="card mt-8">
                    <div class="card-body">
                        <h1 class="card-title">Doe mee!</h1>

                        <h3 class="text-sm text-gray-800">Scan de QR code</h3>
                        <img alt="{{ __("QR code om deel te nemen") }}" class="w-full" id="queue-qr-canvas" src="">

                        <h3 class="text-sm text-gray-800">Of gebruik de URL</h3>
                        <p class="text-gray-900">{{ route('games.join', ['']) }}/<span id="data-id"></span></p>
                    </div>

                    <div class="card-footer">
                        <div class="btn btn-gray cursor-pointer" id="startGameButton">
                            Starten
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full mt-16 hidden" id="answersCard">
        <div class="text-center mb-16">
            <h3 class="text-gray-900 font-bold text-center text-2xl">{{ __("Kijk op je eigen scherm!") }}</h3>
            <p class="text-gray-800">{{ __("Beantwoord de vragen op je eigen apparaat") }}</p>
        </div>

        <div class="w-10/12 mx-auto flex flex-wrap justify-center" id="answersCardPlayers"></div>
    </div>

    <div class="w-full mt-16 hidden" id="votingPreviewCard">
        <div class="text-center mb-16">
            <h3 class="text-gray-900 font-bold text-center text-2xl">{{ __("Dat werd tijd!") }}</h3>
            <p class="text-gray-800">{{ __("Alle vragen zijn beantwoord, tijd om te stemmen.") }}</p>
        </div>

        <div class="w-10/12 mx-auto flex flex-wrap justify-center" id="answersCardPlayers"></div>
    </div>

    <div class="w-full bg-gray-800 min-h-full absolute top-0 left-0 hidden duration-200 opacity-0" id="votingCard">
        <div class="text-white text-center flex content-center mt-32 flex-col">
            <h1 class="text-xl">Welke grap is leuker?</h1>
            <h2 class="text-3xl font-bold text-gray-100">Dit is een grap</h2>

            <div class="flex justify-center mt-12 votingCardAnswerList">
                @for ($i = 0; $i < 2; $i++)
                    <div class="card mx-4 text-black relative votingCardAnswer">
                        <div
                            class="absolute bg-gray-900 shadow-lg text-white rounded-full right-0 top-0 pt-3 scoreDot opacity-0 duration-100"
                            style="height: 50px; width: 50px; right: -25px; top: -25px;">
                            {{ ($i + 1) * 1200 }}
                        </div>

                        <div class="card-body">
                            Boe
                        </div>

                        <div class="card-footer">
                            {{ $i * 2 + 1 }} stemmen
                        </div>
                    </div>
                @endfor
            </div>
        </div>
    </div>

    <script src="{{ mix('js/games/autocomplete/controller.js') }}"></script>
@endsection

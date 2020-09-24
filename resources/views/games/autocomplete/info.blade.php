@extends('layouts.app')

@section('theme-bg', 'bg-indigo-800')
@section('theme-text', 'text-white')
@section('theme-border', 'border-gray-100')

@section('content')
    <div class="text-center py-16 flex indig flex-col">
        <h1 class="text-4xl text-indigo-800 font-bold">Autocomplete</h1>
        <h2 class="text-md text-gray-700">De zoektocht naar de idiootste tekst</h2>

        <div class="mt-8">
            <a href="{{ route('games.autocomplete.controller') }}"
               class="mx-1 bg-indigo-500 hover:bg-indigo-700 duration-75 text-white font-bold py-2 px-4 rounded">
                Start een spel
            </a>
            <a href="{{ route('games.autocomplete.player') }}"
               class="mx-1 bg-indigo-500 hover:bg-indigo-700 duration-75 text-white font-bold py-2 px-4 rounded">
                Doe mee met een spel
            </a>
        </div>
    </div>

    <div class="py-8 bg-indigo-800 text-white">
        <div class="w-10/12 mx-auto flex flex-wrap">
            <div class="w-1/2 p-4">
                <h1 class="text-xl font-bold">Hoe werkt het?</h1>
                <p>In het begin van het spel stuurt iedere speler een vraag in. Al deze vragen worden samengevoegd tot
                    de perfecte kennisquiz van jouw spelgroep. Alle spelers verzinnen antwoorden op verschillende
                    vragen. Uiteindelijk stemt iedereen tegelijkertijd op de antwoorden om tot een winnaar te komen.</p>
            </div>
            <div class="w-1/2 p-4">
                <h1 class="text-xl font-bold">Ik wil meer spanning!</h1>
                <p>Wil je het spel spannender maken? Dat kan! Activeer "party-modus" en de verliezer van elke ronde
                    krijgt een straf. Zo is het mogelijk dat een verliezer een atje moet nemen, of iemand anders een
                    drankje voor hem mag mixen.</p>
            </div>
        </div>
    </div>

    <div class="py-8">
        <div class="w-10/12 mx-auto flex flex-wrap">
            <div class="w-1/2 p-4">
                <h1 class="text-xl font-bold">Hoe nodig ik vrienden uit?</h1>
                <p>Wanneer je een nieuw spel start krijg je een QR-code en een URL te zien. Als andere spelers deze
                    QR-code scannen, of naar de URL gaan, kunnen ze inloggen om mee te doen.</p>
            </div>
            <div class="w-1/2 p-4">
                <h1 class="text-xl font-bold">Waarom heb ik een account nodig?</h1>
                <p>Momenteel gebruiken we accounts om ongewenst gebruik tegen te gaan. Misschien dat we in de toekomst
                    niet verplichten om een account aan te maken, maar momenteel is het een verplichting.</p>
            </div>
        </div>
    </div>
@endsection

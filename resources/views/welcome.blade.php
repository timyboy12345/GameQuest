@extends('layouts.app')

@section('content')
    <div class="w-full bg-blue-900" style="height: 50vh">
        <div class="text-center py-24 z-10 text-white">
            <h1 class="text-4xl font-bold text-white">{{ config('app.name') }}</h1>
            <h3 class="text-gray-400">{{ __("Speel live met z'n allen") }}</h3>
        </div>

        <div class="flex justify-center absolute w-full">
            <div class="w-10/12 h-24">
                <div class="bg-white rounded shadow p-4">
                    <div class="flex flex-col lg:flex-row">
                        <div class="lg:w-1/2 p-4 lg:text-right">
                            <h6 class="text-lg font-bold">{{ __("Over GameQuest") }}</h6>
                            <p class="text-gray-800">GameQuest is een gameplatform met live spellen. Speel tegen
                                vrienden,
                                kennisen of collega's in leuke, interactieve spellen.</p>
                        </div>
                        <div class="lg:w-1/2 p-4">
                            <h6 class="text-lg font-bold">{{ __("Opensource") }}</h6>
                            <p class="text-gray-800">Heb je een leuk idee voor een spel, heb je een bug gevonden of ben
                                je gewoon nieuwsgierig? GameQuest is open-source. Ga naar onze <a
                                    href="https://github.com/timyboy12345/GameQuest">GitHub pagina</a> om mee te werken
                                aan het project.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full mt-48 lg:mt-24">
        <div class="w-10/12 mx-auto">
            <h2 class="text-blue-800 text-xl font-bold mb-2">Onze spellen</h2>
            <div class="bg-white rounded shadow p-4">
                <h1 class="text-indigo-900 font-bold text-md">
                    Autocomplete
                </h1>

                <p class="text-sm text-gray-600">
                    In autocomplete geef je antwoord op random vragen. De persoon met de leukste antwoorden wint de
                    avond!
                </p>
            </div>
        </div>
    </div>
@endsection

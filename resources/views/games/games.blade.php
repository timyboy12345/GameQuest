@extends('layouts.app')

@section('content')
    <div class="flex flex-wrap flex-row justify-start w-11/12 md:w-3/4 mx-auto mt-10">
        <div class="w-100 sm:w-1/2 lg:w-1/3 mb-5">
            <a href="{{ route('games.autocomplete.info') }}" class="block m-5 rounded overflow-hidden shadow-lg">
                <div class="h-5 bg-indigo-800"></div>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">AutoComplete</div>
                    <p class="text-gray-700 text-base">
                        {{ __("Who is the funniest player in your group?") }}
                    </p>
                </div>
            </a>
        </div>

        <div class="w-100 sm:w-1/2 lg:w-1/3 mb-5">
            <a href="{{ route('games.bards.info') }}" class="block m-5 rounded overflow-hidden shadow-lg">
                <div class="h-5 bg-black"></div>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Bards</div>
                    <p class="text-gray-700 text-base">
                        {{ __("What do you have to do? That's in the cards, of course") }}
                    </p>
                </div>
            </a>
        </div>
    </div>
@endsection

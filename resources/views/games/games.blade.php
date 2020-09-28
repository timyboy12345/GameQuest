@extends('layouts.app')

@section('content')
    <div class="flex flex-wrap flex-row justify-between w-11/12 md:w-3/4 mx-auto mt-10">
        <div class="w-100 sm:w-1/2 lg:w-1/3 mb-5">
            <a href="{{ route('games.autocomplete.info') }}" class="block m-5 rounded overflow-hidden shadow-lg">
                <div class="h-5 bg-indigo-800"></div>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">AutoComplete</div>
                    <p class="text-gray-700 text-base">
                        {{ __("De speler die de grappigste teksten verzint wint dit spel!") }}
                    </p>
                </div>
                {{--                    <div class="px-6 pt-4 pb-2">--}}
                {{--                        <span--}}
                {{--                            class="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#photography</span>--}}
                {{--                        <span--}}
                {{--                            class="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#travel</span>--}}
                {{--                        <span--}}
                {{--                            class="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#winter</span>--}}
                {{--                    </div>--}}
            </a>
        </div>
    </div>
@endsection

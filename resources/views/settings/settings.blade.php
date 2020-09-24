@extends('layouts.app')

@section('content')
    <div class="w-10/12 mx-auto mt-24 rounded bg-white shadow">
        @foreach ($games as $game)
            <a href="{{ route('settings.settings') }}"
               class="block hover:bg-gray-100 transition-all duration-100 border-b p-4 cursor-pointer">
                <h3 class="text-blue-800 font-weight-bold mb-2">{{ $game->data->name }}</h3>
                <p class="text-sm mb-2">{{ json_encode($game->data) }}</p>
                <ul class="list-decimal ml-4 text-sm text-gray-700">
                    @foreach ($game->players as $player)
                        <li>{{ $player['name'] }}</li>
                    @endforeach
                </ul>
            </a>
        @endforeach
    </div>
@endsection
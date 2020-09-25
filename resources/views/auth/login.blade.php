@extends('layouts.app')

@section('content')
    <div class="w-full md:w-10/12 lg:w-8/12 my-12 lg:my-24 mx-auto">
        <div class="bg-white shadow md:rounded p-4">
            <h1 class="text-blue-800 font-bold text-xl">Inloggen</h1>
            <p class="text-gray-600 mb-8">Log hieronder in met je inloggegevens.</p>

            <form method="post">
                @csrf

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        {{ __("Email") }}
                    </label>
                    <input autofocus
                        class="shadow appearance-none border @error('email') border-red-500 mb-1 @enderror rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" name="email" placeholder="{{ __("Email") }}" value="{{ old('email') }}">

                    @error('email')
                    <p class="text-red-500 text-xs italic">{{ $message }}</p>
                    @enderror
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        {{ __("Wachtwoord") }}
                    </label>
                    <input
                        class="shadow appearance-none border @error('password') border-red-500 mb-1 @enderror rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="{{ __("Wachtwoord") }}" name="password">

                    @error('password')
                    <p class="text-red-500 text-xs italic">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-6">
                    <input {{ request()->old('remember') != null ? 'checked' : '' }} type="checkbox" name="remember" id="remember">
                    <label for="remember" class="text-gray-700 text-sm font-bold" >{{ __("Onthouden") }}</label>
                </div>

                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        {{ __("Inloggen") }}
                    </button>

                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        {{ __("Wachtwoord vergeten?") }}
                    </a>
                </div>
            </form>
        </div>
    </div>
@endsection
